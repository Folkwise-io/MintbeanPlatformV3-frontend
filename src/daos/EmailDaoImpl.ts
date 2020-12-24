import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { handleServerError } from "../utils/handleServerError";
import { ContactFormEmailInput, EmailDao, EmailResponse } from "./EmailDao";

export class EmailDaoImpl implements EmailDao {
  constructor(private api: ApiQueryExecutor) {}

  sendContactFormEmail(email: ContactFormEmailInput): Promise<EmailResponse> {
    return this.api
      .query<ApiResponseRaw<{ sendContactFormEmail: EmailResponse }>, { input: ContactFormEmailInput }>(
        `
            mutation sendContactFormEmail($input: SendContactFormEmailInput!) {
              sendContactFormEmail(input: $input) {
                recipient
                sender
                statusCode
                status
                timestamp
                errors {
                    message
                    info
                }
              }
            }
          `,
        { input: email },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.sendContactFormEmail) {
          throw [{ message: "Failed to send contact form message.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.sendContactFormEmail;
      })
      .catch(handleServerError);
  }
}
