-- CreateTable
CREATE TABLE "Admins" (
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Admins" ADD CONSTRAINT "Admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
