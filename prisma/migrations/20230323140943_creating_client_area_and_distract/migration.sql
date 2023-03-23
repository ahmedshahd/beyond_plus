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

-- CreateIndex
CREATE UNIQUE INDEX "ClientCity_name_language_key" ON "ClientCity"("name", "language");

-- CreateIndex
CREATE UNIQUE INDEX "ClientArea_name_language_clientCityId_key" ON "ClientArea"("name", "language", "clientCityId");

-- AddForeignKey
ALTER TABLE "ClientArea" ADD CONSTRAINT "ClientArea_clientCityId_fkey" FOREIGN KEY ("clientCityId") REFERENCES "ClientCity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
