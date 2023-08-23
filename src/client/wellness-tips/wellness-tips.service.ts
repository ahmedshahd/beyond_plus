import { ProcessAttachmentsService } from './../../services/process-attachment.service';
import { Injectable } from '@nestjs/common';
import { CreateWellnessTipInput } from './dto/create-wellness-tip.input';
import { UpdateWellnessTipInput } from './dto/update-wellness-tip.input';
import { PrismaService } from 'src/prisma.service';
import { FileUpload } from 'graphql-upload';
import { CreateGlobalWellnessTipInput } from './dto/create-global-wellness-tip.input';
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable()
export class WellnessTipsService {
  constructor(
    private prisma: PrismaService,
    private readonly processAttachmentsService: ProcessAttachmentsService,
    private readonly userProfileService: UserProfileService,
  ) {}

  async createGlobal(
    createGlobalWellnessTipInput: CreateGlobalWellnessTipInput,
    attachments: FileUpload[],
  ) {
    try {
      const allUsers = await this.userProfileService.findAll();
      const allUsersUuid = allUsers.map((user) => user.uuid);

      const { attachmentUrls, imageUrls, imageThumbnailUrls } =
        await this.processAttachmentsService.processGlobalAttachments(
          attachments,
          'health-care',
        );

      const attachmentArray =
        attachmentUrls.length === 0 ? [''] : attachmentUrls;
      const imageArray = imageUrls.length === 0 ? [''] : imageUrls;
      const imageThumbnailArray =
        imageThumbnailUrls.length === 0 ? [''] : imageThumbnailUrls;

      const wellnessTipPromises = allUsersUuid.map(async (uuid) => {
        const wellnessTipData = {
          pdfs: attachmentArray,
          images: imageArray,
          thumbnails: imageThumbnailArray,
          ...createGlobalWellnessTipInput,
          userProfileUuid: uuid,
        };

        return this.prisma.wellnessTips.create({
          data: wellnessTipData,
        });
      });

      const createdWellnessTipRecords = await Promise.all(wellnessTipPromises);
      console.log('createdWellnessTipRecords', createdWellnessTipRecords);
      return createdWellnessTipRecords;
    } catch (error) {
      // Handle the error here
      console.error(
        'An error occurred while creating Wellness Tip records:',
        error,
      );
      throw error; // Rethrow the error to propagate it
    }
  }

  async create(
    createWellnessTipInput: CreateWellnessTipInput,
    attachments?: FileUpload[],
  ) {
    const { userProfileUuid } = createWellnessTipInput;
    // Process attachments if available
    const { attachmentUrls, imageUrls, imageThumbnailUrls } =
      await this.processAttachmentsService.processAttachments(
        attachments,
        userProfileUuid,
        'wellness-tips',
      );
    const attachmentArray = attachmentUrls.length === 0 ? [''] : attachmentUrls;
    const imageArray = imageUrls.length === 0 ? [''] : imageUrls;
    const imageThumbnailArray =
      imageThumbnailUrls.length === 0 ? [''] : imageThumbnailUrls;

    // Create wellness tip using Prisma
    return await this.prisma.wellnessTips.create({
      data: {
        pdfs: attachmentArray,
        images: imageArray,
        thumbnails: imageThumbnailArray,
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
      const { attachmentUrls, imageUrls, imageThumbnailUrls } =
        await this.processAttachmentsService.processAttachments(
          attachments,
          userProfileUuid,
          'wellness-tips',
        );
      const attachmentArray =
        attachmentUrls.length === 0 ? [''] : attachmentUrls;
      const imageArray = imageUrls.length === 0 ? [''] : imageUrls;
      const imageThumbnailArray =
        imageThumbnailUrls.length === 0 ? [''] : imageThumbnailUrls;

      // Save the image URLs in the Prisma database as an array of strings
      return await this.prisma.wellnessTips.update({
        where: { id },
        data: {
          pdfs: attachmentArray,
          images: imageArray,
          thumbnails: imageThumbnailArray,
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
