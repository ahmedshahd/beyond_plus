import { Injectable } from '@nestjs/common';
import { CreateHealthCareInput } from './dto/create-health-care.input';
import { UpdateHealthCareInput } from './dto/update-health-care.input';
import { S3Service } from 'src/client/S3/S3.service';
import { PrismaService } from 'src/prisma.service';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class HealthCareService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createHealthCareInput: CreateHealthCareInput,
    attachment?: FileUpload[],
    // image?: FileUpload,
  ) {
    const { userProfileUuid } = createHealthCareInput;
    // console.log('image', image);
    console.log('attachment', attachment);
    // Process the main image
    // const { createReadStream, filename } = await image.promise;
    // const fileStream = createReadStream();
    // const uniqueFilename = `${Date.now()}-${filename}`;
    // const { Location: imageUrl } = await this.s3Service.upload(
    //   uniqueFilename,
    //   `users/${userProfileUuid}/health-care/images`,
    //   fileStream,
    // );

    // Process attachments if available
    let attachmentUrls = [];
    if (attachment) {
      attachmentUrls = await Promise.all(
        attachment.map(async (attachment) => {
          const { createReadStream, filename } = await attachment.promise;
          const fileStream = createReadStream();
          const uniqueFilename = `${Date.now()}-${filename}`;
          const { Location: attachmentUrl } = await this.s3Service.upload(
            uniqueFilename,
            `users/${userProfileUuid}/health-care/attachment`,
            fileStream,
          );
          return attachmentUrl;
        }),
      );
    }
    const attachmentArray = attachmentUrls.length === 0 ? [''] : attachmentUrls;

    // Create health care  using Prisma
    return await this.prisma.healthCare.create({
      data: {
        attachment: attachmentArray,
        // imageUrl,
        ...createHealthCareInput,
      },
    });
  }

  async findAll() {
    return await this.prisma.healthCare.findMany({});
  }
  async findAllUserHealthCare(userProfileUuid: string) {
    return await this.prisma.healthCare.findMany({
      where: {
        userProfileUuid,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.healthCare.findFirst({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateHealthCareInput: UpdateHealthCareInput,
    attachment?: FileUpload[],
  ) {
    const { userProfileUuid } = updateHealthCareInput;

    if (!attachment || attachment.length === 0) {
      return await this.prisma.healthCare.update({
        where: {
          id,
        },
        data: {
          ...updateHealthCareInput,
        },
      });
    }
    try {
      const uploadPromises = attachment.map(async (attachment) => {
        try {
          const { createReadStream, filename } = await attachment.promise;
          const fileStream = createReadStream();
          // Generate a unique filename for the image
          const uniqueFilename = `${Date.now()}-${filename}`;
          // Upload the image to S3
          const { Location: attachmentUrl } = await this.s3Service.upload(
            uniqueFilename,
            `users/${userProfileUuid}/health-care/attachment`,
            fileStream,
          );
          return attachmentUrl;
        } catch (error) {
          console.error('Error uploading attachment:', error);
          throw new Error('attachment upload failed');
        }
      });

      // Wait for all image uploads to complete
      const attachmentUrls = await Promise.all(uploadPromises);

      // Save the image URLs in the Prisma database as an array of strings
      return await this.prisma.healthCare.update({
        where: { id },
        data: {
          attachment: attachmentUrls,
          ...updateHealthCareInput,
        },
      });
    } catch (error) {
      console.error('Error updating Health Care:', error);
      return false;
    }
  }

  async remove(id: number) {
    return await this.prisma.healthCare.delete({
      where: {
        id,
      },
    });
  }
}
