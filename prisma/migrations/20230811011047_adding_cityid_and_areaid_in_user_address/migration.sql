/*
  Warnings:

  - You are about to drop the column `area` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `UserAddress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clientCityId,clientAreaId,streetName,userProfileUuid]` on the table `UserAddress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientAreaId` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientCityId` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserAddress_city_area_streetName_userProfileUuid_key";

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "area",
DROP COLUMN "city",
ADD COLUMN     "clientAreaId" INTEGER NOT NULL,
ADD COLUMN     "clientCityId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_clientCityId_clientAreaId_streetName_userProfil_key" ON "UserAddress"("clientCityId", "clientAreaId", "streetName", "userProfileUuid");

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_clientCityId_fkey" FOREIGN KEY ("clientCityId") REFERENCES "ClientCity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_clientAreaId_fkey" FOREIGN KEY ("clientAreaId") REFERENCES "ClientArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
