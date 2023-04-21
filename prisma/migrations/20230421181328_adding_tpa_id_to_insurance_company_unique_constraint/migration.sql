/*
  Warnings:

  - A unique constraint covering the columns `[name,language,tpaId]` on the table `InsuranceCompany` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "InsuranceCompany_name_language_key";

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceCompany_name_language_tpaId_key" ON "InsuranceCompany"("name", "language", "tpaId");
