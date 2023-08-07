// Helper function to get or create a speciality

const { PrismaService } = require('../../../prisma.service');
const prisma = new PrismaService();
async function getOrCreateSpeciality( language, name, providerTypeId) {
    return prisma.speciality.upsert({
      where: {
        Speciality_name_language_providerTypeId_unique_constraint: {
          language: language,
          name: name,
          providerTypeId: providerTypeId,
        },
      },
      create: {
        language: language,
        name: name,
        providerTypeId: providerTypeId,
      },
      update: {},
    });
  }
  
  module.exports = getOrCreateSpeciality