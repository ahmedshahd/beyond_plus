-- CreateEnum
CREATE TYPE "LanguageEnum" AS ENUM ('ARABIC', 'ENGLISH');

-- CreateTable
CREATE TABLE "ContactUs" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ContactUs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearnIcon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "LearnIcon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivacyPolicy" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PrivacyPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answers" TEXT[],
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Label" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TermsAndConditions" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "TermsAndConditions_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "companyWorkName" TEXT,
    "insuranceCompanyName" TEXT,
    "medicalInsuranceCardNumber" TEXT,
    "medicalInsuranceCardImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "streetName" TEXT NOT NULL,
    "buildingNumber" INTEGER NOT NULL,
    "floorNumber" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" INTEGER,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "ClientCity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ClientCity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientArea" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "clientCityId" INTEGER NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ClientArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tpa" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Tpa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceCompany" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tpaId" INTEGER,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "InsuranceCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "tier" TEXT NOT NULL,
    "tierRank" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "insuranceCompanyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "tpaId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "insuranceCompanyId" INTEGER NOT NULL,
    "tpaId" INTEGER,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ProviderType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "phoneNumber" TEXT[],
    "email" TEXT,
    "fax" TEXT DEFAULT '',
    "isOnline" BOOLEAN,
    "hasChronicMedication" BOOLEAN,
    "websiteUrl" TEXT,
    "areaId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "providerTypeId" INTEGER NOT NULL,
    "specialityId" INTEGER NOT NULL,
    "subSpecialityId" INTEGER,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speciality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "providerTypeId" INTEGER NOT NULL,

    CONSTRAINT "Speciality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubSpeciality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "specialityId" INTEGER NOT NULL,

    CONSTRAINT "SubSpeciality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "insuranceCompanyId" INTEGER NOT NULL,
    "tpaId" INTEGER,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "language" "LanguageEnum" NOT NULL DEFAULT 'ARABIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactUs_email_key" ON "ContactUs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ClientCity_name_language_key" ON "ClientCity"("name", "language");

-- CreateIndex
CREATE UNIQUE INDEX "ClientArea_name_language_clientCityId_key" ON "ClientArea"("name", "language", "clientCityId");

-- CreateIndex
CREATE UNIQUE INDEX "Tpa_name_language_key" ON "Tpa"("name", "language");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceCompany_name_language_tpaId_key" ON "InsuranceCompany"("name", "language", "tpaId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_tierRank_language_insuranceCompanyId_key" ON "Category"("tierRank", "language", "insuranceCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "ProviderType_name_language_insuranceCompanyId_key" ON "ProviderType"("name", "language", "insuranceCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_name_language_areaId_specialityId_categoryId_addre_key" ON "Provider"("name", "language", "areaId", "specialityId", "categoryId", "address", "phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Speciality_name_language_providerTypeId_key" ON "Speciality"("name", "language", "providerTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "SubSpeciality_name_language_specialityId_key" ON "SubSpeciality"("name", "language", "specialityId");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_language_key" ON "Country"("name", "language");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_language_countryId_insuranceCompanyId_key" ON "City"("name", "language", "countryId", "insuranceCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "Area_name_language_cityId_key" ON "Area"("name", "language", "cityId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientArea" ADD CONSTRAINT "ClientArea_clientCityId_fkey" FOREIGN KEY ("clientCityId") REFERENCES "ClientCity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceCompany" ADD CONSTRAINT "InsuranceCompany_tpaId_fkey" FOREIGN KEY ("tpaId") REFERENCES "Tpa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_insuranceCompanyId_fkey" FOREIGN KEY ("insuranceCompanyId") REFERENCES "InsuranceCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_tpaId_fkey" FOREIGN KEY ("tpaId") REFERENCES "Tpa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderType" ADD CONSTRAINT "ProviderType_insuranceCompanyId_fkey" FOREIGN KEY ("insuranceCompanyId") REFERENCES "InsuranceCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderType" ADD CONSTRAINT "ProviderType_tpaId_fkey" FOREIGN KEY ("tpaId") REFERENCES "Tpa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_providerTypeId_fkey" FOREIGN KEY ("providerTypeId") REFERENCES "ProviderType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_specialityId_fkey" FOREIGN KEY ("specialityId") REFERENCES "Speciality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_subSpecialityId_fkey" FOREIGN KEY ("subSpecialityId") REFERENCES "SubSpeciality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speciality" ADD CONSTRAINT "Speciality_providerTypeId_fkey" FOREIGN KEY ("providerTypeId") REFERENCES "ProviderType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubSpeciality" ADD CONSTRAINT "SubSpeciality_specialityId_fkey" FOREIGN KEY ("specialityId") REFERENCES "Speciality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_insuranceCompanyId_fkey" FOREIGN KEY ("insuranceCompanyId") REFERENCES "InsuranceCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_tpaId_fkey" FOREIGN KEY ("tpaId") REFERENCES "Tpa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
