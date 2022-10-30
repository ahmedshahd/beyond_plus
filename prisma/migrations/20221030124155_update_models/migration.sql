/*
  Warnings:

  - You are about to drop the column `name` on the `ContactUs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ContactUs" DROP COLUMN "name";
