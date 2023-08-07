const { HttpException, HttpStatus } = require('@nestjs/common');
const { PrismaService } = require('../../prisma.service');

const prisma = new PrismaService();
const {
  getOrCreateCountry,
  getOrCreateTpa,
  getOrCreateInsuranceCompany,
  deleteInsuranceCompany,
  getOrCreateCategory,
  getOrCreateCity,
  getOrCreateArea,
  getOrCreateProviderType,
  getOrCreateSpeciality,
  getOrCreateSubSpeciality,
  getOrCreateProvider,
  getUniqueItems,
} = require('./utils');

async function bulkCreateSheet(items, language, insuranceCompanyName, tpaName) {
  const uniqueItems = getUniqueItems(items);

  try {
    await prisma.$transaction(
      async () => {
        console.log('uniqueItems', uniqueItems);

        const country = await getOrCreateCountry(language);

        await deleteInsuranceCompany(insuranceCompanyName, language);

        const tpa = await getOrCreateTpa(tpaName, language);

        const insuranceCompany = await getOrCreateInsuranceCompany(
          insuranceCompanyName,
          language,
          tpa.id,
        );

        await Promise.all(
          uniqueItems.map(async (data, index) => {
            const category = await getOrCreateCategory(
              insuranceCompany.id,
              language,
              parseInt(data.tierRank.trim()),
              data.tier.trim(),
            );

            const city = await getOrCreateCity(
              country.id,
              insuranceCompany.id,
              language,
              data.city.trim(),
            );
            const area = await getOrCreateArea(
              city.id,
              language,
              data.area.trim(),
            );

            const providerType = await getOrCreateProviderType(
              insuranceCompany.id,
              language,
              data.providerType.trim(),
            );

            const speciality = await getOrCreateSpeciality(
              language,
              data.speciality.trim(),
              providerType.id,
            );

            let subSpeciality = null;

            if (data.subSpeciality.trim()) {
              subSpeciality = await getOrCreateSubSpeciality(
                speciality.id,
                language,
                data.subSpeciality.trim(),
              );
            }

            await getOrCreateProvider({
              areaId: area.id,
              insuranceCompanyId: insuranceCompany.id,
              name: data.provider.trim(),
              language: language,
              address: data.address.trim(),
              tierRank: parseInt(category.tierRank),
              hasChronicMedication:
                data.hasChronicMedication.trim().toLocaleLowerCase() == 'no'
                  ? false
                  : true,
              email: data.email || ' ',
              fax: data.fax || ' ',
              longitude: parseFloat(data.longitude.trim()) || null,
              latitude: parseFloat(data.latitude.trim()) || null,
              phoneNumber: data.phoneNumber.trim().split('|'),
              websiteUrl: data.websiteUrl.trim() || '',
              isOnline:
                data.isOnline.trim().toLocaleLowerCase() == 'no' ? false : true,
              specialityId: speciality.id,
              providerTypeId: providerType.id,
              subSpecialityId: subSpeciality ? subSpeciality.id : null,
            });
          }),
        );
      },
      { timeout: 4320000000 },
    );
  } catch (error) {
    console.log('Error occurred during transaction:', error.message);
    throw new HttpException(
      { reason: 'An error occurred during the transaction.' },
      HttpStatus.BAD_REQUEST,
    );
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { bulkCreateSheet };
