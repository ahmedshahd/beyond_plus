/*
  Warnings:

  - Added the required column `region` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "region" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "WelcomeScreen" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "WelcomeScreen_pkey" PRIMARY KEY ("id")
);
