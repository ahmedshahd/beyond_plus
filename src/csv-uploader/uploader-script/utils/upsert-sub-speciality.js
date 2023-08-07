// Helper function to get or create a sub-speciality
const { PrismaService } = require('../../../prisma.service');
const prisma = new PrismaService();


async function getOrCreateSubSpeciality( specialityId, language, name) {
    return prisma.subSpeciality.upsert({
      where: {
        SubSpeciality_name_language_specialityId_unique_constraint: {
          specialityId: specialityId,
          language: language,
          name: name,
        },
      },
      create: {
        specialityId: specialityId,
        language: language,
        name: name,
      },
      update: {},
    });
  }

  module.exports = getOrCreateSubSpeciality