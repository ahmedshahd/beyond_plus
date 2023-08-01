import { Injectable } from '@nestjs/common';
import { LanguageEnum } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateLearnIconInput } from './dto/create-learn-icon.input';
import { UpdateLearnIconInput } from './dto/update-learn-icon.input';
import { S3Service } from 'src/client/S3/S3.service';

@Injectable()
export class LearnIconAdminService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createLearnIconInput: CreateLearnIconInput,
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
        'learn-icon',
        fileStream,
      );

      return await this.prisma.learnIcon.create({
        data: {
          imageUrl,
          language,
          ...createLearnIconInput,
        },
      });
    } catch (error) {
      console.error('Error creating learn icon', error);
      return false;
    }
  }

  async findAll(language: LanguageEnum, search: string) {
    return await this.prisma.learnIcon.findMany({
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

  async update(updateLearnIconInput: UpdateLearnIconInput, image?) {
    if (!image) {
      return await this.prisma.learnIcon.update({
        where: {
          id: updateLearnIconInput.id,
        },
        data: {
          ...updateLearnIconInput,
        },
      });
    }

    const { createReadStream, filename } = await image.promise;
    const fileStream = createReadStream();
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}-${filename}`;

    const { Location: imageUrl } = await this.s3Service.upload(
      uniqueFilename,
      'learn-icon',
      fileStream,
    );

    return await this.prisma.learnIcon.update({
      where: {
        id: updateLearnIconInput.id,
      },
      data: {
        imageUrl,
        ...updateLearnIconInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.learnIcon.delete({
      where: {
        id,
      },
    });
  }
}
