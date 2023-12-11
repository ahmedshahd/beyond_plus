/*
  Warnings:

  - Added the required column `telegramChannel` to the `ContactUs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsappNumber` to the `ContactUs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactUs" ADD COLUMN     "telegramChannel" TEXT NOT NULL,
ADD COLUMN     "whatsappNumber" TEXT NOT NULL;
