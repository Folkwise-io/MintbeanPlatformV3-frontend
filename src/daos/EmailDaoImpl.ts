import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { handleServerError } from "../utils/handleServerError";
import { Email, EmailDao, EmailResponse } from "./EmailDao";

export class EmailDaoImpl implements EmailDao {
  constructor(private api: ApiQueryExecutor) {}

  // KanbanCanon ----------------------------------
  send(email: Email): Promise<EmailResponse> {
    return this.api
      .query<ApiResponseRaw<{ sendEmail: EmailResponse }>, { input: Email }>(
        `
            mutation sendEmail($input: SendEmailInput!) {
              sendEmail(id: $id) {
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
        if (!result.errors && !result.data.sendEmail) {
          throw [{ message: "Failed to send message.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.sendEmail;
      })
      .catch(handleServerError);
  }
}
