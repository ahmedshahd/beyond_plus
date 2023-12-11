import { Module } from '@nestjs/common';
import { TutorialVideoService } from './tutorial-video.service';
import { TutorialVideoResolver } from './tutorial-video.resolver';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from 'src/client/S3/S3.service';

@Module({
  providers: [
    TutorialVideoResolver,
    TutorialVideoService,
    PrismaService,
    S3Service,
  ],
})
export class TutorialVideoModule {}
