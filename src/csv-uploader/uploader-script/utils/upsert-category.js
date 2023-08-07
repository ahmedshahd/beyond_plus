const { PrismaService } = require('../../../prisma.service');
const prisma = new PrismaService();


async function getOrCreateCategory( insuranceCompanyId, language, tierRank, tier) {
    return prisma.category.upsert({
      where: {
        Category_tierRank_language_insuranceCompanyId_unique_constraint: {
          insuranceCompanyId: insuranceCompanyId,
          language: language,
          tierRank: tierRank,
        },
      },
      create: {
        insuranceCompanyId: insuranceCompanyId,
        language: language,
        tierRank: tierRank,
        tier: tier,
      },
      update: {
        insuranceCompanyId: insuranceCompanyId,
        language: language,
        tierRank: tierRank,
      },
    });
  }
  module.exports = getOrCreateCategory