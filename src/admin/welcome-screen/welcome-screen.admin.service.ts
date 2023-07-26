import { LanguageEnum } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWelcomeScreenInput } from './dto/create-welcome-screen.input';
import { UpdateWelcomeScreenInput } from './dto/update-welcome-screen.input';
import { S3Service } from 'src/client/S3/S3.service';
@Injectable()
export class WelcomeScreenAdminService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createWelcomeScreenInput: CreateWelcomeScreenInput,
    language: LanguageEnum,
    image,
  ) {
    const { createReadStream, filename, mimetype } = await image.promise;
    const fileStream = createReadStream();
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}-${filename}`;
    try {
      // Upload the image to S3
      const { Location: imageUrl } = await this.s3Service.upload(
        uniqueFilename,
        'welcome-screen',
        fileStream,
      );

      // Save the image URL in the Prisma database
      return await this.prisma.welcomeScreen.create({
        data: {
          language,
          imageUrl,
          ...createWelcomeScreenInput,
        },
      });
    } catch (error) {
      console.error('Error creating welcome screen:', error);
      return false;
    }
  }

  async findAll(language: LanguageEnum) {
    return await this.prisma.welcomeScreen.findMany({
      where: {
        language,
      },
    });
  }

  async update(updateWelcomeScreenInput: UpdateWelcomeScreenInput, image?) {
    if (!image) {
      return await this.prisma.welcomeScreen.update({
        where: {
          id: updateWelcomeScreenInput.id,
        },
        data: {
          ...updateWelcomeScreenInput,
        },
      });
    }

    const { createReadStream, filename, mimetype } = await image.promise;
    const fileStream = createReadStream();
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}-${filename}`;
    // Upload the image to S3
    const { Location: imageUrl } = await this.s3Service.upload(
      uniqueFilename,
      'welcome-screen',
      fileStream,
    );

    return await this.prisma.welcomeScreen.update({
      where: {
        id: updateWelcomeScreenInput.id,
      },
      data: {
        imageUrl,
        ...updateWelcomeScreenInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.welcomeScreen.delete({
      where: {
        id,
      },
    });
  }
}
