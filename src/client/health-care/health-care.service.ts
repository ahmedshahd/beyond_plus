import { Injectable } from '@nestjs/common';
import { CreateHealthCareInput } from './dto/create-health-care.input';
import { UpdateHealthCareInput } from './dto/update-health-care.input';
import { S3Service } from 'src/client/S3/S3.service';
import { PrismaService } from 'src/prisma.service';
import { FileUpload } from 'graphql-upload';
import { ProcessAttachmentsService } from 'src/services/process-attachment.service';

@Injectable()
export class HealthCareService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
    private readonly processAttachmentsService: ProcessAttachmentsService,
  ) {}

  async create(
    createHealthCareInput: CreateHealthCareInput,
    attachments?: FileUpload[],
    // image?: FileUpload,
  ) {
    const { userProfileUuid } = createHealthCareInput;

    const { attachmentUrls, imageUrls } =
      await this.processAttachmentsService.processAttachments(
        attachments,
        userProfileUuid,
      );
    const attachmentArray = attachmentUrls.length === 0 ? [''] : attachmentUrls;
    const imageArray = imageUrls.length === 0 ? [''] : imageUrls;

    // Create health care  using Prisma
    return await this.prisma.healthCare.create({
      data: {
        attachments: attachmentArray,
        images: imageArray,
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
    attachments?: FileUpload[],
  ) {
    const { userProfileUuid } = updateHealthCareInput;

    if (!attachments || attachments.length === 0) {
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
      const { attachmentUrls, imageUrls } =
        await this.processAttachmentsService.processAttachments(
          attachments,
          userProfileUuid,
        );
      const attachmentArray =
        attachmentUrls.length === 0 ? [''] : attachmentUrls;
      const imageArray = imageUrls.length === 0 ? [''] : imageUrls;

      // Save the image URLs in the Prisma database as an array of strings
      return await this.prisma.healthCare.update({
        where: { id },
        data: {
          attachments: attachmentArray,
          images: imageArray,
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
