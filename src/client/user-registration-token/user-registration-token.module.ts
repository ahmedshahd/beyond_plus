import { Module } from '@nestjs/common';
import { UserRegistrationTokenService } from './user-registration-token.service';
import { UserRegistrationTokenResolver } from './user-registration-token.resolver';
import { UserProfileService } from '../user-profile/user-profile.service';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from '../S3/S3.service';
import { ImageResizeService } from 'src/services/image-resize.service';

@Module({
  providers: [
    UserRegistrationTokenResolver,
    UserRegistrationTokenService,
    UserProfileService,
    PrismaService,
    S3Service,
    ImageResizeService

  ],
})
export class UserRegistrationTokenModule {}
