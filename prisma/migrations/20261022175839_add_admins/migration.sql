/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Admins` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admins_userId_key" ON "Admins"("userId");
