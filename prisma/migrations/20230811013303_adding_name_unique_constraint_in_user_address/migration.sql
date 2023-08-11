/*
  Warnings:

  - A unique constraint covering the columns `[clientCityId,clientAreaId,name,userProfileUuid]` on the table `UserAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserAddress_clientCityId_clientAreaId_streetName_userProfil_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_clientCityId_clientAreaId_name_userProfileUuid_key" ON "UserAddress"("clientCityId", "clientAreaId", "name", "userProfileUuid");
