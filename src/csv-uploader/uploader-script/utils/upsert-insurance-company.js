const { PrismaService } = require('../../../prisma.service');
const prisma = new PrismaService();

  // Helper function to get or create an insurance company
  async function getOrCreateInsuranceCompany(name, language, tpaId) {
    return prisma.insuranceCompany.upsert({
      where: {
        InsuranceCompany_name_language_tpaId_unique_constraint: {
          name: name,
          language: language,
          tpaId: tpaId,
        },
      },
      create: { name: name, language: language, tpaId: tpaId },
      update: {},
    });
  }

  module.exports = getOrCreateInsuranceCompany