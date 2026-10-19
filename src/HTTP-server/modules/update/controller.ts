import { FastifyReply, FastifyRequest } from "fastify";
import UpdateService from "./service";
import UserDatabaseService from "../../../database/users/service";

class UpdateController {
  static async verifyEmail(req: FastifyRequest, reply: FastifyReply) {
    const { userId } = req.user as { userId: number };

    await UpdateService.requestEmailVerification(userId);

    reply.status(200).send({ message: "Verification email sent" });
  }

  static async confirmEmail(req: FastifyRequest, reply: FastifyReply) {
    const { token } = req.params as { token: string };

    await UpdateService.confirmEmailVerification(token);

    reply.status(200).send({ message: "Email confirmed" });
  }

  static async changeEmail(
    req: FastifyRequest<{ Body: { email: string } }>,
    reply: FastifyReply
  ) {
    const { userId } = req.user as { userId: number };
    const { email: newEmail } = req.body;

    await UpdateService.changeEmail(userId, newEmail);

    reply.status(200).send({ message: "Email changed" });
  }

  static async changePassword(
    req: FastifyRequest<{
      Body: { newPassword: string; currentPassword: string };
    }>,
    reply: FastifyReply
  ) {
    const { newPassword, currentPassword } = req.body;
    const { userId } = req.user as { userId: number };

    await UpdateService.setNewPassword(userId, newPassword, currentPassword);

    reply
      .clearCookie("token", {
        httpOnly: true,
        secure: false, // needed for local deploy
        sameSite: "lax",
        path: "/",
      })
      .status(200)
      .send({ message: "Password changed" });
  }

  static async resetPassword(
    req: FastifyRequest<{ Body: { email: string } }>,
    reply: FastifyReply
  ) {
    const { email } = req.body;

    await UpdateService.requestResetPassword(email);

    reply.status(200).send({ message: "Verification email sent" });
  }

  static async confirmPassword(
    req: FastifyRequest<{ Body: { newPassword: string } }>,
    reply: FastifyReply
  ) {
    const { token } = req.params as { token: string };
    const { newPassword } = req.body;

    await UpdateService.validateResetPassword(token, newPassword);

    reply
      .clearCookie("token", {
        httpOnly: true,
        secure: false, // needed for local deploy
        sameSite: "lax",
        path: "/",
      })
      .status(200)
      .send({ message: "Password changed" });
  }

  static async changeUsername(
    req: FastifyRequest<{ Body: { username: string } }>,
    reply: FastifyReply
  ) {
    const { userId } = req.user as { userId: number };
    const { username: newUsername } = req.body;

    await UpdateService.changeUsername(userId, newUsername);

    reply.status(200).send({ message: "Username changed" });
  }
}

export default UpdateController;
