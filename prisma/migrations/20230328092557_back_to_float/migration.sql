/*
  Warnings:

  - The `longitude` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `latitude` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `longitude` column on the `Provider` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `latitude` column on the `Provider` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "longitude",
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
DROP COLUMN "latitude",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "longitude",
ADD COLUMN     "longitude" DOUBLE PRECISION DEFAULT 0.0,
DROP COLUMN "latitude",
ADD COLUMN     "latitude" DOUBLE PRECISION DEFAULT 0.0;
