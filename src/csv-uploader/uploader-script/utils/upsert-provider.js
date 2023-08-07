// Helper function to get or create a provider
const { PrismaService } = require('../../../prisma.service');
const prisma = new PrismaService();

async function getOrCreateProvider( data) {
    return prisma.provider.upsert({
      where: {
        Provider_name_language_speciality_areaId_categoryId_address_phoneNumber_unique_constraint:
          {
            areaId: data.areaId,
            insuranceCompanyId: data.insuranceCompanyId,
            name: data.name,
            language: data.language,
            address: data.address,
            phoneNumber: data.phoneNumber,
            specialityId: data.specialityId,
            tierRank: data.tierRank,
          },
      },
      create: {
        areaId: data.areaId,
        insuranceCompanyId: data.insuranceCompanyId,
        name: data.name,
        language: data.language,
        address: data.address,
        tierRank: data.tierRank,
        hasChronicMedication: data.hasChronicMedication,
        email: data.email || ' ',
        fax: data.fax || ' ',
        longitude: data.longitude || null,
        latitude: data.latitude || null,
        phoneNumber: data.phoneNumber,
        websiteUrl: data.websiteUrl || '',
        isOnline: data.isOnline,
        specialityId: data.specialityId,
        providerTypeId: data.providerTypeId,
        subSpecialityId: data.subSpecialityId || null,
      },
      update: {},
    });
  }
  
  module.exports = getOrCreateProvider