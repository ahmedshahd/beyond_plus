import { ProcessAttachmentsService } from './../../services/process-attachment.service';
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
    private readonly processAttachmentsService: ProcessAttachmentsService,
  ) {}

  async create(
    createWellnessTipInput: CreateWellnessTipInput,
    attachments?: FileUpload[],
  ) {
    const { userProfileUuid } = createWellnessTipInput;
    // Process attachments if available
    const { attachmentUrls, imageUrls } =
      await this.processAttachmentsService.processAttachments(
        attachments,
        userProfileUuid,
      );
    const attachmentArray = attachmentUrls.length === 0 ? [''] : attachmentUrls;
    const imageArray = imageUrls.length === 0 ? [''] : imageUrls;

    // Create wellness tip using Prisma
    return await this.prisma.wellnessTips.create({
      data: {
        attachments: attachmentArray,
        images: imageArray,
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
    attachments?: FileUpload[],
  ) {
    const { userProfileUuid } = updateWellnessTipInput;

    if (!attachments || attachments.length === 0) {
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
      // Process attachments if available
      const { attachmentUrls, imageUrls } =
        await this.processAttachmentsService.processAttachments(
          attachments,
          userProfileUuid,
        );
      const attachmentArray =
        attachmentUrls.length === 0 ? [''] : attachmentUrls;
      const imageArray = imageUrls.length === 0 ? [''] : imageUrls;

      // Save the image URLs in the Prisma database as an array of strings
      return await this.prisma.wellnessTips.update({
        where: { id },
        data: {
          attachments: attachmentArray,
          images: imageArray,
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
