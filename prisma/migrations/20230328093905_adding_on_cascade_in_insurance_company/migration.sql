-- DropForeignKey
ALTER TABLE "InsuranceCompany" DROP CONSTRAINT "InsuranceCompany_tpaId_fkey";

-- AddForeignKey
ALTER TABLE "InsuranceCompany" ADD CONSTRAINT "InsuranceCompany_tpaId_fkey" FOREIGN KEY ("tpaId") REFERENCES "Tpa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
