/*
  Warnings:

  - You are about to drop the column `imagesThumbnails` on the `HealthCare` table. All the data in the column will be lost.
  - You are about to drop the column `pdfsThumbnails` on the `HealthCare` table. All the data in the column will be lost.
  - You are about to drop the column `imagesThumbnails` on the `WellnessTips` table. All the data in the column will be lost.
  - You are about to drop the column `pdfsThumbnails` on the `WellnessTips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HealthCare" DROP COLUMN "imagesThumbnails",
DROP COLUMN "pdfsThumbnails",
ADD COLUMN     "thumbnails" TEXT[] DEFAULT ARRAY['']::TEXT[];

-- AlterTable
ALTER TABLE "WellnessTips" DROP COLUMN "imagesThumbnails",
DROP COLUMN "pdfsThumbnails",
ADD COLUMN     "thumbnails" TEXT[] DEFAULT ARRAY['']::TEXT[];
