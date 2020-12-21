// sendPartnerContactFormEmail;
import { EmailResponse, EmailResponseStatus } from "../../../src/daos/EmailDao";
import { TestManager } from "../TestManager";

const PARTNER_CONTACT_EMAIL_SUCCESS_RESPONSE: EmailResponse = {
  recipient: "foo@foo.com;baz@baz.com",
  sender: "noreply@mintbean.io",
  statusCode: 202,
  status: EmailResponseStatus.SUCCESS,
  timestamp: new Date().toISOString(),
};
const PARTNER_CONTACT_EMAIL_ERR_MSG = "Some error";

const PARTNER_CONTACT_EMAIL_FAILED_RESPONSE: EmailResponse = {
  recipient: "foo@foo.com;baz@baz.com",
  sender: "noreply@mintbean.io",
  statusCode: 400,
  status: EmailResponseStatus.BAD_REQUEST,
  timestamp: new Date().toISOString(),
  errors: [{ message: PARTNER_CONTACT_EMAIL_ERR_MSG, info: "Some info" }],
};

const TEST_EMAIL = "test@email.com";
const TEST_FULLNAME = "test@email.com";
const TEST_MESSAGE = "test";
const TEST_GOAL = "test goal";

const PARTNER_CONTACT_EMAIL_INPUT: PartnerContactFormInput = {
  email: TEST_EMAIL,
  fullName: TEST_FULLNAME,
  message: TEST_MESSAGE,
  partnershipGoals: [TEST_GOAL],
};

describe("EmailService", () => {
  let testManager: TestManager;

  describe("sendPartnerContactFormEmail()", () => {
    beforeEach(() => {
      testManager = TestManager.build();
    });
    afterEach(() => {
      // Just to be safe!
      testManager.configureContext((context) => {
        context.emailDao.clearMockReturns();
      });
    });
    it("handles a successful email silently", async () => {
      await testManager
        .configureContext((context) => {
          context.emailDao.mockReturn({ data: PARTNER_CONTACT_EMAIL_SUCCESS_RESPONSE });
        })
        .execute((context) => {
          return context.emailService.sendPartnerContactFormEmail(PARTNER_CONTACT_EMAIL_INPUT).then((result) => {
            expect(result).toMatchObject(PARTNER_CONTACT_EMAIL_SUCCESS_RESPONSE);
          });
        });
      const finalState = testManager.store.getState();
      expect(finalState.errors).toHaveLength(0);
      // expect no toast messaging
      expect(finalState.toasts).toHaveLength(0);
    });
    it("throws toast and logs error if email failed", async () => {
      await testManager
        .configureContext((context) => {
          context.emailDao.mockReturn({ data: PARTNER_CONTACT_EMAIL_FAILED_RESPONSE });
        })
        .execute((context) => {
          return context.emailService.sendPartnerContactFormEmail(PARTNER_CONTACT_EMAIL_INPUT).then((result) => {
            expect(result).toMatchObject(PARTNER_CONTACT_EMAIL_FAILED_RESPONSE);
          });
        });
      const finalState: StoreState = testManager.store.getState();
      console.log({ finalState });
      expect(finalState.errors).toHaveLength(1);
      expect(finalState.toasts[0].type).toBe("DANGER");
      expect(finalState.toasts[0].message).toMatch(new RegExp(PARTNER_CONTACT_EMAIL_ERR_MSG));
    });
  });
});
