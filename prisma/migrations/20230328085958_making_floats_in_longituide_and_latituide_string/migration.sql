/*
  Warnings:

  - Made the column `longitude` on table `Provider` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `Provider` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "longitude" SET DEFAULT '0.0',
ALTER COLUMN "longitude" SET DATA TYPE TEXT,
ALTER COLUMN "latitude" SET DEFAULT '0.0',
ALTER COLUMN "latitude" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Provider" ALTER COLUMN "longitude" SET NOT NULL,
ALTER COLUMN "longitude" SET DEFAULT '0.0',
ALTER COLUMN "longitude" SET DATA TYPE TEXT,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "latitude" SET DEFAULT '0.0',
ALTER COLUMN "latitude" SET DATA TYPE TEXT;
