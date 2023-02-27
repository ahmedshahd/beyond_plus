/*
  Warnings:

  - A unique constraint covering the columns `[name,language,areaId,specialityId,categoryId,address,phoneNumber]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Provider_name_language_areaId_specialityId_categoryId_addre_key";

-- AlterTable
ALTER TABLE "Provider" ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "fax" DROP NOT NULL,
ALTER COLUMN "isOnline" DROP NOT NULL,
ALTER COLUMN "hasChronicMedication" DROP NOT NULL,
ALTER COLUMN "websiteUrl" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Provider_name_language_areaId_specialityId_categoryId_addre_key" ON "Provider"("name", "language", "areaId", "specialityId", "categoryId", "address", "phoneNumber");
