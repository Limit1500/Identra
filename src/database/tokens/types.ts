import { TokenTypes } from "../../../prisma/generated/prisma/enums";

export type TokenType = {
  id: number;
  type: TokenTypes;
  token: string;

  expiresAt: Date;
  createdAt: Date;

  userId: number;
};
