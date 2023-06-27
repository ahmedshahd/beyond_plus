import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileResolver } from './user-profile.resolver';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from '../S3/S3.service';

@Module({
  providers: [
    UserProfileResolver,
    UserProfileService,
    PrismaService,
    S3Service,
  ],
})
export class UserProfileModule {}
