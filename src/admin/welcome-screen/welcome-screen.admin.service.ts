import { LanguageEnum } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWelcomeScreenInput } from './dto/create-welcome-screen.input';
import { UpdateWelcomeScreenInput } from './dto/update-welcome-screen.input';
import { S3Service } from 'src/client/S3/S3.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Injectable()
export class WelcomeScreenAdminService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createWelcomeScreenInput: CreateWelcomeScreenInput,
    language: LanguageEnum,
    images: FileUpload[],
  ) {
    try {
      const uploadPromises = images.map(async (image) => {
        const { createReadStream, filename } = await image.promise;
        const fileStream = createReadStream();
        // Generate a unique filename for the image
        const uniqueFilename = `${Date.now()}-${filename}`;
        // Upload the image to S3
        const { Location: imageUrl } = await this.s3Service.upload(
          uniqueFilename,
          'welcome-screen',
          fileStream,
        );
        return imageUrl;
      });

      // Wait for all image uploads to complete
      const imageUrls = await Promise.all(uploadPromises);

      // Save the image URLs in the Prisma database as an array of strings
      return await this.prisma.welcomeScreen.create({
        data: {
          language,
          imageUrls, // Store the array of image URLs
          ...createWelcomeScreenInput,
        },
      });
    } catch (error) {
      console.error('Error creating welcome screen:', error);
      return false;
    }
  }

  async findAll(language: LanguageEnum, search: string) {
    return await this.prisma.welcomeScreen.findMany({
      where: {
        language,
        title: search
          ? {
              contains: search,
              mode: 'insensitive',
            }
          : undefined,
      },
    });
  }

  async update(
    updateWelcomeScreenInput: UpdateWelcomeScreenInput,
    images?: FileUpload[],
  ) {
    if (!images || images.length === 0) {
      return await this.prisma.welcomeScreen.update({
        where: {
          id: updateWelcomeScreenInput.id,
        },
        data: {
          ...updateWelcomeScreenInput,
        },
      });
    }

    try {
      const uploadPromises = images.map(async (image) => {
        try {
          const { createReadStream, filename } = await image.promise;
          const fileStream = createReadStream();
          // Generate a unique filename for the image
          const uniqueFilename = `${Date.now()}-${filename}`;
          // Upload the image to S3
          const { Location: imageUrl } = await this.s3Service.upload(
            uniqueFilename,
            'welcome-screen',
            fileStream,
          );
          return imageUrl;
        } catch (error) {
          console.error('Error uploading image:', error);
          throw new Error('Image upload failed');
        }
      });

      // Wait for all image uploads to complete
      const imageUrls = await Promise.all(uploadPromises);

      // Save the image URLs in the Prisma database as an array of strings
      return await this.prisma.welcomeScreen.update({
        where: { id: updateWelcomeScreenInput.id },
        data: {
          imageUrls, // Store the array of image URLs
          ...updateWelcomeScreenInput,
        },
      });
    } catch (error) {
      console.error('Error updating welcome screen:', error);
      return false;
    }
  }

  async remove(id: number) {
    return await this.prisma.welcomeScreen.delete({
      where: {
        id,
      },
    });
  }
}
