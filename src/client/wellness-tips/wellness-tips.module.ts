import { Module } from '@nestjs/common';
import { WellnessTipsService } from './wellness-tips.service';
import { WellnessTipsResolver } from './wellness-tips.resolver';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from 'src/client/S3/S3.service';
import { ProcessAttachmentsService } from 'src/services/process-attachment.service';
import { ImageThumbnailService } from 'src/services/image-thumbnail.service';
// import { PdfThumbnailService } from 'src/services/pdf-thumbnail.service';


@Module({
  providers: [
    WellnessTipsResolver,
    WellnessTipsService,
    PrismaService,
    S3Service,
    ProcessAttachmentsService,
    ImageThumbnailService,
  ],
})
export class WellnessTipsModule {}
