/*
  Warnings:

  - You are about to drop the column `wbsiteUrl` on the `ContactUs` table. All the data in the column will be lost.
  - Added the required column `websiteUrl` to the `ContactUs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactUs" DROP COLUMN "wbsiteUrl",
ADD COLUMN     "websiteUrl" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "lineOfBusiness" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "lineOfBusiness_pkey" PRIMARY KEY ("id")
);
