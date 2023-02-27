/*
  Warnings:

  - You are about to drop the column `parentId` on the `InsuranceCompany` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,language,areaId,specialityId,categoryId,address,phoneNumber]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "InsuranceCompany" DROP CONSTRAINT "InsuranceCompany_parentId_fkey";

-- DropIndex
DROP INDEX "Provider_name_language_areaId_specialityId_categoryId_addre_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "tpaId" INTEGER;

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "tpaId" INTEGER;

-- AlterTable
ALTER TABLE "InsuranceCompany" DROP COLUMN "parentId",
ADD COLUMN     "tpaId" INTEGER;

-- AlterTable
ALTER TABLE "Provider" ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "fax" DROP NOT NULL,
ALTER COLUMN "isOnline" DROP NOT NULL,
ALTER COLUMN "hasChronicMedication" DROP NOT NULL,
ALTER COLUMN "websiteUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProviderType" ADD COLUMN     "tpaId" INTEGER;

-- CreateTable
CREATE TABLE "Tpa" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Tpa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tpa_name_language_key" ON "Tpa"("name", "language");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_name_language_areaId_specialityId_categoryId_addre_key" ON "Provider"("name", "language", "areaId", "specialityId", "categoryId", "address", "phoneNumber");

-- AddForeignKey
ALTER TABLE "InsuranceCompany" ADD CONSTRAINT "InsuranceCompany_tpaId_fkey" FOREIGN KEY ("tpaId") REFERENCES "Tpa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_tpaId_fkey" FOREIGN KEY ("tpaId") REFERENCES "Tpa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderType" ADD CONSTRAINT "ProviderType_tpaId_fkey" FOREIGN KEY ("tpaId") REFERENCES "Tpa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_tpaId_fkey" FOREIGN KEY ("tpaId") REFERENCES "Tpa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
