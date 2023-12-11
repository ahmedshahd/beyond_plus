import { LanguageEnum } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLineOfBusinessInput } from './dto/create-line-of-business.input';
import { UpdateLineOfBusinessInput } from './dto/update-line-of-business.input';
import { S3Service } from 'src/client/S3/S3.service';
@Injectable()
export class LineOfBusinessAdminService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createLineOfBusinessInput: CreateLineOfBusinessInput,
    language: LanguageEnum,
    image,
  ) {
    const { createReadStream, filename } = await image.promise;
    const fileStream = createReadStream();
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}-${filename}`;

    try {
      // Upload the image to S3
      const { Location: imageUrl } = await this.s3Service.upload(
        uniqueFilename,
        'line-of-business',
        fileStream,
      );

      return await this.prisma.lineOfBusiness.create({
        data: {
          language,
          imageUrl,
          ...createLineOfBusinessInput,
        },
      });
    } catch (error) {
      console.error('Error creating line of business', error);
      return false;
    }
  }

  async findAll(language: LanguageEnum, search: string) {
    return await this.prisma.lineOfBusiness.findMany({
      where: {
        language,
        name: search
          ? {
              contains: search,
              mode: 'insensitive',
            }
          : undefined,
      },
    });
  }

  async update(updateLineOfBusinessInput: UpdateLineOfBusinessInput, image) {
    if (!image) {
      return await this.prisma.lineOfBusiness.update({
        where: {
          id: updateLineOfBusinessInput.id,
        },
        data: {
          ...updateLineOfBusinessInput,
        },
      });
    }

    const { createReadStream, filename } = await image.promise;
    const fileStream = createReadStream();
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}-${filename}`;

    const { Location: imageUrl } = await this.s3Service.upload(
      uniqueFilename,
      'line-of-business',
      fileStream,
    );

    return await this.prisma.lineOfBusiness.update({
      where: {
        id: updateLineOfBusinessInput.id,
      },
      data: {
        imageUrl,
        ...updateLineOfBusinessInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.lineOfBusiness.delete({
      where: {
        id,
      },
    });
  }
}
