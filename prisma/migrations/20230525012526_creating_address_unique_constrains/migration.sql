/*
  Warnings:

  - A unique constraint covering the columns `[city,area,streetName,userProfileUuid]` on the table `UserAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserAddress_userProfileUuid_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_city_area_streetName_userProfileUuid_key" ON "UserAddress"("city", "area", "streetName", "userProfileUuid");
