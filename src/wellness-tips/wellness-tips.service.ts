import { Injectable } from '@nestjs/common';
import { CreateWellnessTipInput } from './dto/create-wellness-tip.input';
import { UpdateWellnessTipInput } from './dto/update-wellness-tip.input';
import { S3Service } from 'src/client/S3/S3.service';
import { PrismaService } from 'src/prisma.service';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class WellnessTipsService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createWellnessTipInput: CreateWellnessTipInput,
    attachment?: FileUpload[],
    // image?: FileUpload,
  ) {
    const { userProfileUuid } = createWellnessTipInput;
    // console.log('image', image);
    console.log('attachment', attachment);
    // Process the main image
    // const { createReadStream, filename } = await image.promise;
    // const fileStream = createReadStream();
    // const uniqueFilename = `${Date.now()}-${filename}`;
    // const { Location: imageUrl } = await this.s3Service.upload(
    //   uniqueFilename,
    //   `users/${userProfileUuid}/wellness-tips/images`,
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
            `users/${userProfileUuid}/wellness-tips/attachment`,
            fileStream,
          );
          return attachmentUrl;
        }),
      );
    }
    const attachmentArray = attachmentUrls.length === 0 ? [''] : attachmentUrls;

    // Create wellness tip using Prisma
    return await this.prisma.wellnessTips.create({
      data: {
        attachment: attachmentArray,
        // imageUrl,
        ...createWellnessTipInput,
      },
    });
  }

  async findAll() {
    return await this.prisma.wellnessTips.findMany({});
  }
  async findAllUserWellnessTips(userProfileUuid: string) {
    return await this.prisma.wellnessTips.findMany({
      where: {
        userProfileUuid,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.wellnessTips.findFirst({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateWellnessTipInput: UpdateWellnessTipInput,
    attachment?: FileUpload[],
  ) {
    const { userProfileUuid } = updateWellnessTipInput;

    if (!attachment || attachment.length === 0) {
      return await this.prisma.wellnessTips.update({
        where: {
          id,
        },
        data: {
          ...updateWellnessTipInput,
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
            `users/${userProfileUuid}/wellness-tips/attachment`,
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
      return await this.prisma.wellnessTips.update({
        where: { id },
        data: {
          attachment: attachmentUrls,
          ...updateWellnessTipInput,
        },
      });
    } catch (error) {
      console.error('Error updating Wellness Tip:', error);
      return false;
    }
  }

  async remove(id: number) {
    return await this.prisma.wellnessTips.delete({
      where: {
        id,
      },
    });
  }
}
