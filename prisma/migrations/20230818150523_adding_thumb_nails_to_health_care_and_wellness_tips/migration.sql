/*
  Warnings:

  - You are about to drop the column `attachments` on the `HealthCare` table. All the data in the column will be lost.
  - You are about to drop the column `attachments` on the `WellnessTips` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HealthCare" DROP COLUMN "attachments",
ADD COLUMN     "imagesThumbnails" TEXT[] DEFAULT ARRAY['']::TEXT[],
ADD COLUMN     "pdfs" TEXT[] DEFAULT ARRAY['']::TEXT[],
ADD COLUMN     "pdfsThumbnails" TEXT[] DEFAULT ARRAY['']::TEXT[],
ALTER COLUMN "images" SET DEFAULT ARRAY['']::TEXT[];

-- AlterTable
ALTER TABLE "WellnessTips" DROP COLUMN "attachments",
ADD COLUMN     "imagesThumbnails" TEXT[] DEFAULT ARRAY['']::TEXT[],
ADD COLUMN     "pdfs" TEXT[] DEFAULT ARRAY['']::TEXT[],
ADD COLUMN     "pdfsThumbnails" TEXT[] DEFAULT ARRAY['']::TEXT[];
