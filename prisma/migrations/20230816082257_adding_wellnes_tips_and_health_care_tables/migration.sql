-- CreateTable
CREATE TABLE "WellnessTips" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "details" TEXT,
    "imageUrl" TEXT,
    "attachment" TEXT[] DEFAULT ARRAY['']::TEXT[],
    "userProfileUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "WellnessTips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthCare" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "details" TEXT,
    "imageUrl" TEXT,
    "attachment" TEXT[] DEFAULT ARRAY['']::TEXT[],
    "userProfileUuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "HealthCare_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WellnessTips" ADD CONSTRAINT "WellnessTips_userProfileUuid_fkey" FOREIGN KEY ("userProfileUuid") REFERENCES "UserProfile"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthCare" ADD CONSTRAINT "HealthCare_userProfileUuid_fkey" FOREIGN KEY ("userProfileUuid") REFERENCES "UserProfile"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
