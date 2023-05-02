/*
  Warnings:

  - A unique constraint covering the columns `[name,language,areaId,specialityId,insuranceCompanyId,tierRank,address,phoneNumber]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `tierRank` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `insuranceCompanyId` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tierRank` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_categoryId_fkey";

-- DropIndex
DROP INDEX "Provider_name_language_areaId_specialityId_categoryId_addre_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "tierRank",
ADD COLUMN     "tierRank" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "insuranceCompanyId" INTEGER NOT NULL,
ADD COLUMN     "tierRank" INTEGER NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_tierRank_language_insuranceCompanyId_key" ON "Category"("tierRank", "language", "insuranceCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_name_language_areaId_specialityId_insuranceCompany_key" ON "Provider"("name", "language", "areaId", "specialityId", "insuranceCompanyId", "tierRank", "address", "phoneNumber");

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_insuranceCompanyId_fkey" FOREIGN KEY ("insuranceCompanyId") REFERENCES "InsuranceCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
