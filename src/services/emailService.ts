import { ContactFormEmailInput, EmailDao, EmailResponse, EmailResponseStatus } from "../daos/EmailDao";
import { LoggerService } from "./loggerService";
import { EntityService } from "./entityService";

interface PartnerContactFormInput {
  email: string;
  fullName: string;
  message: string;
  partnershipGoals: string[];
}

export class EmailService extends EntityService {
  constructor(private emailDao: EmailDao, logger: LoggerService) {
    super(logger);
  }

  async sendPartnerContactFormEmail(input: PartnerContactFormInput): Promise<EmailResponse | void> {
    return this.handleService(async () => {
      const contactEmail = buildPartnerContactEmail(input);
      const response = await this.emailDao.sendContactFormEmail(contactEmail);
      // Responses for failed emails return as normalized (not error) data responses. Filter by status for error logging.
      if (response.status !== EmailResponseStatus.SUCCESS) {
        const errors = response.errors ? response.errors.map((e) => e.message).join("; ") : "An unknown error ocurred";
        this.logger.danger(`Something went wrong when attempting to send your message: ${errors}`);
      }
      return response;
    });
  }
}

const buildPartnerContactEmail = (input: PartnerContactFormInput): ContactFormEmailInput => {
  const { fullName, partnershipGoals } = input;

  const goals = partnershipGoals.join(", ");
  const subject = `[Partner Contact] ${fullName} is interested in: ${goals}`;

  const tableRows = Object.entries(input)
    .map(
      ([key, value]) => `
    <tr>
      <td class="key">${key}</td>
      <td><strong>${value}</strong></td>
    </tr>
  `,
    )
    .join("");

  const html = `
  <html>
    <head>
      <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 1rem;
          white-space: pre-wrap;
        }
        .key {
          width: 150px;
        }

        tr:nth-child(even) {
          background-color: #dddddd;
        }
    </style>
  </head>
  <body>
    <div>
      <p><strong>${fullName}</strong> is interested in becoming a Mintbean Partner!</p>
      <p>Check out their message and reply to them in a new email.</p>
      <p><em>(Do not reply to this email.)</em></p>
       <table>
        ${tableRows}
      </table>
    </div>

   
  </body>
</html>
  `;
  return { subject, html };
};
