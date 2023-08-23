import { Injectable } from '@nestjs/common';
import { CreateHealthCareInput } from './dto/create-health-care.input';
import { UpdateHealthCareInput } from './dto/update-health-care.input';
import { PrismaService } from 'src/prisma.service';
import { FileUpload } from 'graphql-upload';
import { ProcessAttachmentsService } from 'src/services/process-attachment.service';
import { UserProfileService } from './../user-profile/user-profile.service';
import { CreateGlobalHealthCareInput } from './dto/create-global-health-care.input';

@Injectable()
export class HealthCareService {
  constructor(
    private prisma: PrismaService,
    private readonly processAttachmentsService: ProcessAttachmentsService,
    private readonly userProfileService: UserProfileService,
  ) {}

  async createGlobal(
    createGlobalHealthCareInput: CreateGlobalHealthCareInput,
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

      const healthCarePromises = allUsersUuid.map(async (uuid) => {
        const healthCareData = {
          pdfs: attachmentArray,
          images: imageArray,
          thumbnails: imageThumbnailArray,
          ...createGlobalHealthCareInput,
          userProfileUuid: uuid,
        };

        return this.prisma.healthCare.create({
          data: healthCareData,
        });
      });

      const createdHealthCareRecords = await Promise.all(healthCarePromises);
      console.log("createdHealthCareRecords", createdHealthCareRecords);
      return createdHealthCareRecords;
    } catch (error) {
      // Handle the error here
      console.error(
        'An error occurred while creating health care records:',
        error,
      );
      throw error; // Rethrow the error to propagate it
    }
  }

  async create(
    createHealthCareInput: CreateHealthCareInput,
    attachments?: FileUpload[],
    // image?: FileUpload,
  ) {
    const { userProfileUuid } = createHealthCareInput;

    const { attachmentUrls, imageUrls, imageThumbnailUrls } =
      await this.processAttachmentsService.processAttachments(
        attachments,
        userProfileUuid,
        'health-care',
      );
    const attachmentArray = attachmentUrls.length === 0 ? [''] : attachmentUrls;
    const imageArray = imageUrls.length === 0 ? [''] : imageUrls;
    const imageThumbnailArray =
      imageThumbnailUrls.length === 0 ? [''] : imageThumbnailUrls;

    // Create health care  using Prisma
    return await this.prisma.healthCare.create({
      data: {
        pdfs: attachmentArray,
        images: imageArray,
        thumbnails: imageThumbnailArray,
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
      const { attachmentUrls, imageUrls, imageThumbnailUrls } =
        await this.processAttachmentsService.processAttachments(
          attachments,
          userProfileUuid,
          'health-care',
        );
      const attachmentArray =
        attachmentUrls.length === 0 ? [''] : attachmentUrls;
      const imageArray = imageUrls.length === 0 ? [''] : imageUrls;
      const imageThumbnailArray =
        imageThumbnailUrls.length === 0 ? [''] : imageThumbnailUrls;

      // Save the image URLs in the Prisma database as an array of strings
      return await this.prisma.healthCare.update({
        where: { id },
        data: {
          pdfs: attachmentArray,
          images: imageArray,
          thumbnails: imageThumbnailArray,
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
