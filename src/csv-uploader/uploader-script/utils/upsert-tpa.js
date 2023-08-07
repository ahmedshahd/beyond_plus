const { PrismaService } = require('../../../prisma.service');
const prisma = new PrismaService();


async function getOrCreateTpa( name, language) {
    return prisma.tpa.upsert({
      where: {
        Tpa_name_language_unique_constraint: {
          name: name,
          language: language,
        },
      },
      create: { name: name, language: language },
      update: {},
    });
  }
  module.exports = getOrCreateTpa