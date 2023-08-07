const { PrismaService } = require('../../../prisma.service');
const prisma = new PrismaService();

// Helper function to get or create an area
async function getOrCreateArea(cityId, language, name) {
    return prisma.area.upsert({
      where: {
        Area_name_language_cityId_unique_constraint: {
          cityId: cityId,
          language: language,
          name: name,
        },
      },
      create: {
        cityId: cityId,
        language: language,
        name: name,
      },
      update: {},
    });
  }
  
  module.exports = getOrCreateArea