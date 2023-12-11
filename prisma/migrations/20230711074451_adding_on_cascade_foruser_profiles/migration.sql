-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_userProfileUuid_fkey";

-- DropForeignKey
ALTER TABLE "UserInsuranceInfo" DROP CONSTRAINT "UserInsuranceInfo_userProfileUuid_fkey";

-- AddForeignKey
ALTER TABLE "UserInsuranceInfo" ADD CONSTRAINT "UserInsuranceInfo_userProfileUuid_fkey" FOREIGN KEY ("userProfileUuid") REFERENCES "UserProfile"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userProfileUuid_fkey" FOREIGN KEY ("userProfileUuid") REFERENCES "UserProfile"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
