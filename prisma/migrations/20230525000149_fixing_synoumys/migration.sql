/*
  Warnings:

  - You are about to drop the column `CompanyAddress` on the `UserInsuranceInfo` table. All the data in the column will be lost.
  - Added the required column `companyAddress` to the `UserInsuranceInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserInsuranceInfo" DROP COLUMN "CompanyAddress",
ADD COLUMN     "companyAddress" TEXT NOT NULL;
