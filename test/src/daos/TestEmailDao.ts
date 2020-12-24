import { ContactFormEmailInput, EmailDao, EmailResponse } from "../../../src/daos/EmailDao";

type SuccessDataTypes = EmailResponse;

export class TestEmailDao implements EmailDao {
  data: EmailResponse[];
  private mockReturns: ApiResponseRaw<SuccessDataTypes | null>[];
  constructor() {
    this.data = [];
    this.mockReturns = [];
  }

  async sendContactFormEmail(input: ContactFormEmailInput): Promise<EmailResponse> {
    if (!input)
      throw {
        message: "You forget to inlclude 'input' as a param in test script",
        extensions: { code: "TEST_CODE_ERROR" },
      } as ServerError;

    const errorReturns = this.getErrors();
    const successReturns = this.getSuccesses();
    if (errorReturns.length) {
      // Mock failed
      throw errorReturns;
    } else if (successReturns.length) {
      // Mock successful
      return (successReturns[0].data as unknown) as EmailResponse;
    } else {
      throw {
        message: "This shouldn't happen",
        extensions: { code: "UNEXPECTED" },
      } as ServerError;
    }
  }

  mockReturn(mr: ApiResponseRaw<SuccessDataTypes | null>) {
    this.mockReturns.push(mr);
  }

  getErrors = () => {
    return this.mockReturns.filter(
      (mr: ApiResponseRaw<SuccessDataTypes | null>) => (mr.errors as unknown) as ApiResponseRaw<null>,
    );
  };

  getSuccesses = () => {
    return this.mockReturns.filter(
      (mr: ApiResponseRaw<SuccessDataTypes | null>) => (mr.data as unknown) as ApiResponseRaw<SuccessDataTypes>,
    );
  };

  clearMockReturns(): void {
    this.mockReturns = [];
  }
}
