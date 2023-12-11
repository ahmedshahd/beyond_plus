import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { S3Service } from 'src/client/S3/S3.service';
import { ImageThumbnailService } from './image-thumbnail.service';

@Injectable()
export class ProcessAttachmentsService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly imageThumbnailService: ImageThumbnailService,
  ) {}

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
    let imageThumbnailLocation = null;
    let pdfThumbnailLocation = null;

    if (s3Folder === 'attachments') {
      // pdfThumbnailLocation = await this.pdfThumbnailService.uploadPdfThumbnail(
      //   thumbnailFileStream,
      //   uniqueFilename,
      //   userProfileUuid,
      //   serviceName,
      // );
    }

    if (s3Folder === 'images') {
      imageThumbnailLocation =
        await this.imageThumbnailService.uploadImageThumbnail(
          thumbnailFileStream,
          uniqueFilename,
          userProfileUuid,
          serviceName,
        );
    }

    const { Location: originalLocation } = await this.s3Service.upload(
      uniqueFilename,
      `users/${userProfileUuid}/${serviceName}/${s3Folder}`,
      fileStream,
    );

    return {
      originalLocation,
      isImage: s3Folder === 'images',
      imageThumbnailLocation,
      pdfThumbnailLocation,
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
            imageThumbnailUrls.push(attachment.imageThumbnailLocation);
          } else {
            attachmentUrls.push(attachment.originalLocation);
            // pdfThumbnailUrls.push(attachment.pdfThumbnailLocation);

          }
        }
      } catch (error) {
        throw new Error('Error uploading attachments: ' + error.message);
      }
    }

    return { attachmentUrls, imageUrls, imageThumbnailUrls };
  }


  private async uploadGlobalAttachment(
    attachment: FileUpload,
    serviceName: string,
  ) {
    const { createReadStream, filename, mimetype } = await attachment.promise;
    const fileStream = createReadStream();
    const thumbnailFileStream = createReadStream();
    const uniqueFilename = `${Date.now()}-${filename}`;
    const s3Folder = mimetype.startsWith('image/') ? 'images' : 'attachments';
    let imageThumbnailLocation = null;
    let pdfThumbnailLocation = null;

    if (s3Folder === 'attachments') {
     
    }

    if (s3Folder === 'images') {
      imageThumbnailLocation =
        await this.imageThumbnailService.uploadGlobalImageThumbnail(
          thumbnailFileStream,
          uniqueFilename,
          serviceName,
        );
    }

    const { Location: originalLocation } = await this.s3Service.upload(
      uniqueFilename,
      `${serviceName}/${s3Folder}`,
      fileStream,
    );

    return {
      originalLocation,
      isImage: s3Folder === 'images',
      imageThumbnailLocation,
      pdfThumbnailLocation,
    };
  }

  async processGlobalAttachments(
    attachments: FileUpload[],
    serviceName: string,
  ) {
    const attachmentUrls = [];
    const imageUrls = [];
    const imageThumbnailUrls = [];

    if (attachments) {
      const attachmentsToUpload = attachments.map((attachment) =>
        this.uploadGlobalAttachment(attachment, serviceName),
      );

      try {
        const uploadedAttachments = await Promise.all(attachmentsToUpload);
        console.log('uploadedAttachments', uploadedAttachments);
        for (const attachment of uploadedAttachments) {
          if (attachment.isImage) {
            imageUrls.push(attachment.originalLocation);
            imageThumbnailUrls.push(attachment.imageThumbnailLocation);
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
