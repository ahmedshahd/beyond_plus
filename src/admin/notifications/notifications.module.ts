import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { FcmService } from 'src/services/fcm.service';
import { S3Service } from 'src/client/S3/S3.service';
import { UserProfileService } from 'src/client/user-profile/user-profile.service';
import { PrismaService } from 'src/prisma.service';
import { ImageResizeService } from 'src/services/image-resize.service';

@Module({
  providers: [
    NotificationsResolver,
    NotificationsService,
    FcmService,
    S3Service,
    UserProfileService,
    PrismaService,
    ImageResizeService
  ],
})
export class NotificationsModule {}
