import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/client/S3/S3.service';
import { PrismaService } from 'src/prisma.service';
import { CreateTutorialVideoInput } from './dto/create-tutorial-video';
import { UpdateTutorialVideoInput } from './dto/update-tutorial-video';

@Injectable()
export class TutorialVideoService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(createTutorialVideoInput: CreateTutorialVideoInput, video,language) {
    const { createReadStream, filename } = await video.promise;
    const fileStream = createReadStream();
    // Generate a unique filename for the video
    const uniqueFilename = `${Date.now()}-${filename}`;
    try {
      // Upload the video to S3
      const { Location: videoUrl } = await this.s3Service.upload(
        uniqueFilename,
        'tutorial-Video',
        fileStream,
      );

      // Save the video URL in the Prisma database
      return await this.prisma.tutorialVideos.create({
        data: {
          videoUrl,
          language,
          ...createTutorialVideoInput,
        },
      });
    } catch (error) {
      console.error('Error creating tutorial video:', error);
      return false;
    }
  }

  async findAll(language,search: string) {
    return await this.prisma.tutorialVideos.findMany({
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

  async update(updateTutorialVideoInput: UpdateTutorialVideoInput, video?, language?) {
    if (!video) {
      return await this.prisma.tutorialVideos.update({
        where: {
          id: updateTutorialVideoInput.id,
        },
        data: {
          language,
          ...updateTutorialVideoInput,
        },
      });
    }

    const { createReadStream, filename } = await video.promise;
    const fileStream = createReadStream();
    // Generate a unique filename for the video
    const uniqueFilename = `${Date.now()}-${filename}`;
    // Upload the video to S3
    const { Location: videoUrl } = await this.s3Service.upload(
      uniqueFilename,
      'tutorial-Video',
      fileStream,
    );

    return await this.prisma.tutorialVideos.update({
      where: {
        id: updateTutorialVideoInput.id,
      },
      data: {
        language,
        videoUrl,
        ...updateTutorialVideoInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.tutorialVideos.delete({
      where: {
        id,
      },
    });
  }
}
