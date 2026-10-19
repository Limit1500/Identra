/*
  Warnings:

  - Changed the type of `type` on the `Tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TokenTypes" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- AlterTable
ALTER TABLE "Tokens" DROP COLUMN "type",
ADD COLUMN     "type" "TokenTypes" NOT NULL;

-- CreateIndex
CREATE INDEX "Tokens_userId_type_idx" ON "Tokens"("userId", "type");
