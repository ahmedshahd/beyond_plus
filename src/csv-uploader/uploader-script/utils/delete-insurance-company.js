const { PrismaService } = require('../../../prisma.service');
const prisma = new PrismaService();

async function deleteInsuranceCompany( name, language) {
    return prisma.insuranceCompany.deleteMany({
      where: {
        name: name,
        language: language,
      },
    });
  }

  module.exports = deleteInsuranceCompany