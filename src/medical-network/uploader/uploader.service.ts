import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LanguageEnum, Prisma, PrismaClient } from '@prisma/client';
import { Queue } from 'bull';
import * as fs from 'fs';
import { parse } from 'papaparse';
import { PrismaService } from 'src/prisma.service';
import { ts } from 'ts-morph';
import { CSV_QUEUE } from '../constants/queue.data';
import { IDataCsv } from '../interfaces/data-csv.sheet.interface';
@Injectable()
export class UploaderService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue(CSV_QUEUE) private readonly csvQueue: Queue,
  ) {}

  async parseUploadedFile(
    filePath: string,
    language: LanguageEnum,
    tpaName: string,
    insuranceCompanyName: string,
  ) {
    const items = await this.csvByStream(filePath);

    await this.csvQueue.add('insertIntoDatabase', {
      items,
      language,
      tpaName,
      insuranceCompanyName,
      filePath,
    });
  }

  async csvByStream(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const file = fs.createReadStream(filePath);
      let count = 0; // cache the running count
      let head = [];
      const result = [];
      parse(file, {
        worker: true, // Don't bog down the main thread if its a big file
        step: function (row: {
          data: Array<string>;
          errors: Array<{
            type: string;
            code: string;
            message: string;
            row: number;
          }>;
          meta: {
            delimiter: string;
          };
        }) {
          if (row.errors.length > 0) {
            const errorsMessages = row.errors
              .map((obj) => {
                return obj.message;
              })
              .join(',');

            reject(errorsMessages);
          }
          if (count == 0) {
            head = row.data;
          } else {
            const current = row.data.reduce((obj, ele, index) => {
              obj[head[index]] = ele;
              return obj;
            }, {});
            result.push(current);
          }
          count++;
        },
        complete: function () {
          resolve(result);
        },
      });
    });
  }

  async bulkCreateSheet(
    items: Array<IDataCsv>,
    language: LanguageEnum,
    insuranceCompanyName: string,
    tpaName: string,
  ) {
    try {
      return this.prisma.$transaction(
        async (prisma: any) => {
          const country = await prisma.country.upsert({
            where: {
              Country_name_language_unique_constraint: {
                name: language == 'ENGLISH' ? 'Egypt' : 'مصر',
                language: language,
              },
            },
            create: {
              name: language == 'ENGLISH' ? 'Egypt' : 'مصر',
              language: language,
            },
            update: {},
          });

          // I used delete many for fix prisma issue on delete cascade for not found record
          await prisma.insuranceCompany.deleteMany({
            where: {
              name: insuranceCompanyName,
              language: language,
            },
          });

          const tpa = await prisma.insuranceCompany.upsert({
            where: {
              InsuranceCompany_name_language_unique_constraint: {
                name: tpaName,
                language: language,
              },
            },
            create: { name: tpaName, language: language, parentId: null },
            update: {},
          });

          const insuranceCompany = await prisma.insuranceCompany.upsert({
            where: {
              InsuranceCompany_name_language_unique_constraint: {
                name: insuranceCompanyName,
                language: language,
              },
            },
            create: {
              name: insuranceCompanyName,
              language: language,
              parentId: tpa.id,
            },
            update: {},
          });

          await Promise.all(
            items.map(async (data, index) => {
              const category = await prisma.category.upsert({
                where: {
                  Category_tierRank_language_insuranceCompanyId_unique_constraint:
                    {
                      insuranceCompanyId: insuranceCompany.id,
                      language: language,
                      tierRank: data.tierRank.trim(),
                    },
                },
                create: {
                  insuranceCompanyId: insuranceCompany.id,
                  language: language,
                  tierRank: data.tierRank.trim(),
                  tier: data.tier.trim(),
                },
                update: {
                  insuranceCompanyId: insuranceCompany.id,
                  language: language,
                  tierRank: data.tierRank.trim(),
                },
              });

              const city = await prisma.city.upsert({
                where: {
                  City_name_language_countryId_insuranceCompanyId_unique_constraint:
                    {
                      countryId: country.id,
                      insuranceCompanyId: insuranceCompany.id,
                      language: language,
                      name: data.city.trim(),
                    },
                },
                create: {
                  countryId: country.id,
                  insuranceCompanyId: insuranceCompany.id,
                  language: language,
                  name: data.city.trim(),
                },
                update: {},
              });

              const area = await prisma.area.upsert({
                where: {
                  Area_name_language_cityId_unique_constraint: {
                    cityId: city.id,
                    language: language,
                    name: data.area.trim(),
                  },
                },
                create: {
                  cityId: city.id,
                  language: language,
                  name: data.area.trim(),
                },
                update: {},
              });

              const providerType = await prisma.providerType.upsert({
                where: {
                  ProviderType_name_language_insuranceCompanyId_unique_constraint:
                    {
                      insuranceCompanyId: insuranceCompany.id,
                      language: language,
                      name: data.providerType.trim(),
                    },
                },
                create: {
                  insuranceCompanyId: insuranceCompany.id,
                  language: language,
                  name: data.providerType.trim(),
                },
                update: {},
              });

              const speciality = await prisma.speciality.upsert({
                where: {
                  Speciality_name_language_providerTypeId_unique_constraint: {
                    language: language,
                    name: data.speciality.trim(),
                    providerTypeId: providerType.id,
                  },
                },
                create: {
                  language: language,
                  name: data.speciality.trim(),
                  providerTypeId: providerType.id,
                },
                update: {},
              });

              const subSpeciality = await prisma.subSpeciality.upsert({
                where: {
                  SubSpeciality_name_language_specialityId_unique_constraint: {
                    specialityId: speciality.id,
                    language: language,
                    name: data.subSpeciality.trim(),
                  },
                },
                create: {
                  specialityId: speciality.id,
                  language: language,
                  name: data.subSpeciality.trim(),
                },
                update: {},
              });

              const provider = await prisma.provider.upsert({
                where: {
                  Provider_name_language_speciality_areaId_categoryId_address_phoneNumber_fax_email_websiteUrl_longitude_latitude_unique_constraint:
                    {
                      areaId: area.id,
                      categoryId: category.id,
                      name: data.provider.trim(),
                      language: language,
                      address: data.address.trim(),
                      email: data.email || ' ',
                      fax: data.fax || ' ',
                      longitude: parseFloat(data.longitude.trim()) || 0,
                      latitude: parseFloat(data.latitude.trim()) || 0,
                      phoneNumber: data.phoneNumber.trim().split('|'),
                      websiteUrl: data.websiteUrl.trim() || '',
                      specialityId: speciality.id,
                    },
                },
                create: {
                  areaId: area.id,
                  categoryId: category.id,
                  name: data.provider,
                  language: language,
                  address: data.address.trim(),
                  hasChronicMedication:
                    data.hasChronicMedication.trim().toLocaleLowerCase() == 'no'
                      ? false
                      : true,
                  email: data.email || ' ',
                  fax: data.fax || ' ',
                  longitude: parseFloat(data.longitude.trim()) || 0,
                  latitude: parseFloat(data.latitude.trim()) || 0,
                  phoneNumber: data.phoneNumber.trim().split('|'),
                  websiteUrl: data.websiteUrl.trim() || '',
                  isOnline:
                    data.isOnline.trim().toLocaleLowerCase() == 'no'
                      ? false
                      : true,
                  specialityId: speciality.id,
                  subSpecialityId: subSpeciality.id || null,
                },
                update: {},
              });
            }),
          );
        },
        { timeout: 10000000000 },
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
