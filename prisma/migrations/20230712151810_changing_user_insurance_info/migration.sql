/*
  Warnings:

  - You are about to drop the column `insuranceCompany` on the `UserInsuranceInfo` table. All the data in the column will be lost.
  - You are about to drop the column `tpa` on the `UserInsuranceInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserInsuranceInfo" DROP COLUMN "insuranceCompany",
DROP COLUMN "tpa",
ADD COLUMN     "insuranceCompanyId" INTEGER,
ADD COLUMN     "tpaId" INTEGER;
