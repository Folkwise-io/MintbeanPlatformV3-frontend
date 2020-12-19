// The three Email types below are synced with the backend
export interface ContactFormEmailInput {
  subject: string;
  html: string;
}

/** Covers possible response codes from email API. Sendgrid only returns: 2xx, 4xx, or 5xx.
See https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/errors.html */
export enum EmailResponseStatus {
  SUCCESS = "SUCCESS",
  BAD_REQUEST = "BAD_REQUEST",
  API_SERVER_ERROR = "API_SERVER_ERROR", // sendgrid's fault
  UNKNOWN_ERROR = "UNKOWN_ERROR",
}

//** Normalized API response for sunny/bad scenarios */
export interface EmailResponse {
  recipient: string;
  sender: string;
  statusCode: number;
  status: EmailResponseStatus;
  timestamp: string;
  errors?: {
    message: string;
    info?: string;
  }[];
}
export interface EmailDao {
  sendContactFormEmail(email: ContactFormEmailInput): Promise<EmailResponse>;
}
