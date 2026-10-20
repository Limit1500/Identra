import { EmailType } from "./types";
import { Resend } from "resend";
import { EmailTemplates } from "./templates.js";
import { env } from "../config/environment.var";

const resend = new Resend(env.EMAILER_API_KEY);

export class EmailService {
  static async sendEmail(to: string, type: EmailType, token: string) {
    if (type === EmailType.verifyEmail) {
      const verificationUrl = `http://localhost:${
        env.HTTP_PORT
      }/update/verify-email/confirm/${encodeURIComponent(token)}`;

      const template = EmailTemplates.verifyEmail(verificationUrl);

      return resend.emails.send({
        from: env.EMAILER_ADDRESS!,
        to,
        ...template,
      });
    }
    if (type === EmailType.resetPassword) {
      const verificationUrl = `http://localhost:${
        env.HTTP_PORT
      }/update/reset-password/confirm/${encodeURIComponent(token)}`;

      const template = EmailTemplates.resetPassword(verificationUrl);

      return resend.emails.send({
        from: env.EMAILER_ADDRESS!,
        to,
        ...template,
      });
    }
  }
}
