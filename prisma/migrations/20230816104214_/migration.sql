/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `HealthCare` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `WellnessTips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HealthCare" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "WellnessTips" DROP COLUMN "imageUrl";
