/*
  Warnings:

  - You are about to drop the column `attachment` on the `HealthCare` table. All the data in the column will be lost.
  - You are about to drop the column `attachment` on the `WellnessTips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HealthCare" DROP COLUMN "attachment",
ADD COLUMN     "attachments" TEXT[] DEFAULT ARRAY['']::TEXT[],
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "WellnessTips" DROP COLUMN "attachment",
ADD COLUMN     "attachments" TEXT[] DEFAULT ARRAY['']::TEXT[],
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY['']::TEXT[];
