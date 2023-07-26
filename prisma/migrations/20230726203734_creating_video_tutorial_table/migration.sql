-- AlterTable
ALTER TABLE "WelcomeScreen" ALTER COLUMN "text" DROP NOT NULL;

-- AlterTable
ALTER TABLE "lineOfBusiness" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "details" DROP NOT NULL;

-- CreateTable
CREATE TABLE "tutorialVideos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tutorialVideos_pkey" PRIMARY KEY ("id")
);
