-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "longitude" DROP DEFAULT,
ALTER COLUMN "latitude" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Provider" ALTER COLUMN "longitude" DROP DEFAULT,
ALTER COLUMN "latitude" DROP DEFAULT;
