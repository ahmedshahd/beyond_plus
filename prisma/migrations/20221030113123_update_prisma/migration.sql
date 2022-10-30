/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ContactUs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `ContactUs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `ContactUs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `LearnIcon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactUs" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LearnIcon" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ContactUs_email_key" ON "ContactUs"("email");
