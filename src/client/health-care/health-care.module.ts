import { Module } from '@nestjs/common';
import { HealthCareService } from './health-care.service';
import { HealthCareResolver } from './health-care.resolver';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from 'src/client/S3/S3.service';
import { ProcessAttachmentsService } from 'src/services/process-attachment.service';
import { ImageThumbnailService } from 'src/services/image-thumbnail.service';
import { UserProfileService } from './../user-profile/user-profile.service';
import { FcmService } from 'src/services/fcm.service';
import { ImageResizeService } from 'src/services/image-resize.service';

@Module({
  providers: [
    HealthCareResolver,
    HealthCareService,
    PrismaService,
    S3Service,
    ProcessAttachmentsService,
    ImageThumbnailService,
    UserProfileService,
    FcmService,
    ImageResizeService
  ],
})
export class HealthCaresModule {}
