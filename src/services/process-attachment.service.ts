import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { S3Service } from 'src/client/S3/S3.service';
import * as pdfThumbnail from 'pdf-thumbnail';
import { ReadStream } from 'fs';
import { parse } from 'path';
import { ImageThumbnailService } from './image-thumbnail.service';

@Injectable()
export class ProcessAttachmentsService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly imageThumbnailService: ImageThumbnailService,
  ) {}

  // private async generateImageThumbnail(fileStream) {
  //   return await fileStream.pipe(
  //     sharp()
  //       .resize({ width: 100, height: 100 })

  //   );
  // }

  private async uploadAttachment(
    attachment: FileUpload,
    userProfileUuid: string,
    serviceName: string,
  ) {
    const { createReadStream, filename, mimetype } = await attachment.promise;
    const fileStream = createReadStream();
    const thumbnailFileStream = createReadStream();
    const uniqueFilename = `${Date.now()}-${filename}`;
    const s3Folder = mimetype.startsWith('image/') ? 'images' : 'attachments';
    let thumbnailLocation = null;

    if (s3Folder === 'images') {
      thumbnailLocation = await this.imageThumbnailService.uploadThumbnail(
        thumbnailFileStream,
        uniqueFilename,
        userProfileUuid,
        serviceName,
      );
      console.log('imageThumbnail from if', thumbnailLocation);
    }

    console.log('before');

    const { Location: originalLocation } = await this.s3Service.upload(
      uniqueFilename,
      `users/${userProfileUuid}/${serviceName}/${s3Folder}`,
      fileStream,
    );
    console.log('location', Location);

    console.log('after');
    return {
      originalLocation,
      isImage: s3Folder === 'images',
      thumbnailLocation,
    };
  }

  async processAttachments(
    attachments: FileUpload[],
    userProfileUuid: string,
    serviceName: string,
  ) {
    const attachmentUrls = [];
    const imageUrls = [];
    const imageThumbnailUrls = [];

    if (attachments) {
      const attachmentsToUpload = attachments.map((attachment) =>
        this.uploadAttachment(attachment, userProfileUuid, serviceName),
      );

      try {
        const uploadedAttachments = await Promise.all(attachmentsToUpload);
        console.log('uploadedAttachments', uploadedAttachments);
        for (const attachment of uploadedAttachments) {
          if (attachment.isImage) {
            imageUrls.push(attachment.originalLocation);
            imageThumbnailUrls.push(attachment.thumbnailLocation);
          } else {
            attachmentUrls.push(attachment.originalLocation);
          }
        }
      } catch (error) {
        throw new Error('Error uploading attachments: ' + error.message);
      }
    }

    return { attachmentUrls, imageUrls, imageThumbnailUrls };
  }
}
