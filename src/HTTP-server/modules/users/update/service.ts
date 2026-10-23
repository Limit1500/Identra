import UserDatabaseService from "../../../../database/users/service";
import AppError from "../../../error/types";
import { EmailService } from "../../../../emailer/service";
import { EmailType } from "../../../../emailer/types";
import TokenDatabseService from "../../../../database/tokens/service";
import { TokenTypes } from "../../../../../prisma/generated/prisma/enums";
import { TokenType } from "../../../../database/tokens/types";
import { createHash } from "crypto";
import argon2 from "argon2";

class UpdateService {
  static async requestEmailVerification(userId: number) {
    const user = await UserDatabaseService.getUserById(userId);

    if (user === null || user === undefined) {
      throw new AppError(404, "User not found");
    }

    const { emailVerified: isVerified, email } = user;
    if (isVerified === true) {
      throw new AppError(400, "Email already verified");
    }

    const { token } = await TokenDatabseService.replaceToken(
      userId,
      TokenTypes.EMAIL_VERIFICATION
    );

    await EmailService.sendEmail(email, EmailType.verifyEmail, token);
  }

  static async confirmEmailVerification(token: string) {
    const storedToken: TokenType | null =
      await TokenDatabseService.getTokenByHash(token);

    if (
      storedToken === null ||
      storedToken.expiresAt.getTime() <= Date.now() ||
      storedToken.type !== TokenTypes.EMAIL_VERIFICATION
    ) {
      throw new AppError(401, "Invalid token");
    }

    await TokenDatabseService.deleteTokenByHash(token);
    await UserDatabaseService.setEmailVerified(storedToken.userId);
  }

  static async changeEmail(userId: number, newEmail: string) {
    const user = await UserDatabaseService.getUserByEmail(newEmail);

    if (user) {
      throw new AppError(400, "Email already exists");
    }

    return await UserDatabaseService.setNewEmail(userId, newEmail);
  }

  static async setNewPassword(
    userId: number,
    newPassword: string,
    currentPassword: string
  ) {
    const user = await UserDatabaseService.getUserById(userId);

    if (user === null || user === undefined) {
      throw new AppError(404, "User not found");
    }

    const currentPasswordIsValid = await argon2.verify(
      user.password,
      currentPassword
    );

    if (currentPasswordIsValid === false) {
      throw new AppError(401, "Wrong current password");
    }

    const newPasswordHash = await argon2.hash(newPassword);
    return await UserDatabaseService.setNewPassword(userId, newPasswordHash);
  }

  static async requestResetPassword(email: string) {
    const user = await UserDatabaseService.getUserByEmail(email);

    if (user === null || user === undefined) {
      throw new AppError(404, "User not found");
    }

    if (user.emailVerified === false) {
      throw new AppError(401, "Email is not verified");
    }

    const { token } = await TokenDatabseService.replaceToken(
      user.id,
      TokenTypes.PASSWORD_RESET
    );

    await EmailService.sendEmail(user.email, EmailType.resetPassword, token);
  }

  static async validateResetPassword(token: string, newPassword: string) {
    const storedToken: TokenType | null =
      await TokenDatabseService.getTokenByHash(token);

    if (
      storedToken === null ||
      storedToken.expiresAt.getTime() <= Date.now() ||
      storedToken.type !== TokenTypes.PASSWORD_RESET
    ) {
      throw new AppError(401, "Invalid token");
    }
    const newPasswordHash = await argon2.hash(newPassword);

    await TokenDatabseService.deleteTokenByHash(token);
    await UserDatabaseService.setNewPassword(
      storedToken.userId,
      newPasswordHash
    );
  }

  static async changeUsername(userId: number, newUsername: string) {
    const user = await UserDatabaseService.getUserByUsername(newUsername);

    if (user) {
      throw new AppError(409, "Username already exists");
    }

    return await UserDatabaseService.setNewUsername(userId, newUsername);
  }
}

export default UpdateService;
