/*
  Warnings:

  - You are about to drop the column `userAddressId` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `userInsuranceInfoId` on the `UserProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userProfileUuid]` on the table `UserAddress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userProfileUuid]` on the table `UserInsuranceInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userProfileUuid` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `UserAddress` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userProfileUuid` to the `UserInsuranceInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_userAddressId_fkey";

-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_userInsuranceInfoId_fkey";

-- AlterTable
ALTER TABLE "UserAddress" ADD COLUMN     "userProfileUuid" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserInsuranceInfo" ADD COLUMN     "userProfileUuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "userAddressId",
DROP COLUMN "userInsuranceInfoId";

-- CreateIndex
CREATE UNIQUE INDEX "UserAddress_userProfileUuid_key" ON "UserAddress"("userProfileUuid");

-- CreateIndex
CREATE UNIQUE INDEX "UserInsuranceInfo_userProfileUuid_key" ON "UserInsuranceInfo"("userProfileUuid");

-- AddForeignKey
ALTER TABLE "UserInsuranceInfo" ADD CONSTRAINT "UserInsuranceInfo_userProfileUuid_fkey" FOREIGN KEY ("userProfileUuid") REFERENCES "UserProfile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userProfileUuid_fkey" FOREIGN KEY ("userProfileUuid") REFERENCES "UserProfile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
