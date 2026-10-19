import { EmailType } from "./types";
import { Resend } from "resend";
import { EmailTemplates } from "./templates.js";

const resend = new Resend(process.env.EMAILER_API_KEY);

export class EmailService {
  static async sendEmail(to: string, type: EmailType, token: string) {
    if (type === EmailType.verifyEmail) {
      const verificationUrl = `${
        process.env.APP_URL
      }/update/verify-email/confirm/${encodeURIComponent(token)}`;

      const template = EmailTemplates.verifyEmail(verificationUrl);

      return resend.emails.send({
        from: process.env.EMAILER_ADDRESS!,
        to,
        ...template,
      });
    }
    if (type === EmailType.resetPassword) {
      const verificationUrl = `${
        process.env.APP_URL
      }/update/reset-password/confirm/${encodeURIComponent(token)}`;

      const template = EmailTemplates.resetPassword(verificationUrl);

      return resend.emails.send({
        from: process.env.EMAILER_ADDRESS!,
        to,
        ...template,
      });
    }
  }
}
