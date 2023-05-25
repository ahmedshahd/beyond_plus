/*
  Warnings:

  - You are about to drop the column `StreetName` on the `UserAddress` table. All the data in the column will be lost.
  - Added the required column `streetName` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "StreetName",
ADD COLUMN     "streetName" TEXT NOT NULL;
