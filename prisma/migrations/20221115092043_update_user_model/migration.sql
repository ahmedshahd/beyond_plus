/*
  Warnings:

  - You are about to drop the column `companyWork` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[keycloakUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyWork",
DROP COLUMN "email",
DROP COLUMN "mobile",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "companyWorkName" TEXT,
ADD COLUMN     "keycloakUserId" TEXT,
ADD COLUMN     "medicalInsuranceCardImageUrl" TEXT,
ADD COLUMN     "medicalInsuranceCardNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_keycloakUserId_key" ON "User"("keycloakUserId");
