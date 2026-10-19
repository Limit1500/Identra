import { randomBytes, createHash } from "node:crypto";
import { TokenTypes } from "../../../prisma/generated/prisma/enums";
import prisma from "../db-instance";
import { TOKEN_EXPIRATION_TIME } from "../../config/time-constants";
import { TokenType } from "./types";

class TokenDatabaseService {
  static async replaceToken(
    userId: number,
    type: TokenTypes
  ): Promise<TokenType> {
    const token = this.generateToken();
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION_TIME);

    return prisma.$transaction(async (tx) => {
      await tx.tokens.deleteMany({
        where: { userId, type },
      });

      return tx.tokens.create({
        data: {
          userId,
          type,
          token: tokenHash,
          expiresAt,
        },
      });
    });
  }

  static async deleteTokenByHash(tokenHash: string) {
    return await prisma.tokens.delete({
      where: {
        token: tokenHash,
      },
    });
  }

  static async getTokenByHash(tokenHash: string) {
    return await prisma.tokens.findUnique({ where: { token: tokenHash } });
  }

  private static generateToken(): string {
    return randomBytes(32).toString("hex");
  }
}

export default TokenDatabaseService;
