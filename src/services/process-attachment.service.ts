import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { S3Service } from 'src/client/S3/S3.service';

@Injectable()
export class ProcessAttachmentsService {
  constructor(private readonly s3Service: S3Service) {}

  private async uploadAttachment(
    attachment: FileUpload,
    userProfileUuid: string,
    serviceName: string,
  ) {
    const { createReadStream, filename, mimetype } = await attachment.promise;
    const fileStream = createReadStream();
    const uniqueFilename = `${Date.now()}-${filename}`;
    const s3Folder = mimetype.startsWith('image/') ? 'images' : 'attachments';

    const { Location } = await this.s3Service.upload(
      uniqueFilename,
      `users/${userProfileUuid}/${serviceName}/${s3Folder}`,
      fileStream,
    );

    return { location: Location, isImage: s3Folder === 'images' };
  }

  async processAttachments(
    attachments: FileUpload[],
    userProfileUuid: string,
    serviceName: string,
  ) {
    const attachmentUrls = [];
    const imageUrls = [];

    if (attachments) {
      const attachmentsToUpload = attachments.map((attachment) =>
        this.uploadAttachment(attachment, userProfileUuid, serviceName),
      );

      try {
        const uploadedAttachments = await Promise.all(attachmentsToUpload);

        for (const attachment of uploadedAttachments) {
          if (attachment.isImage) {
            imageUrls.push(attachment.location);
          } else {
            attachmentUrls.push(attachment.location);
          }
        }
      } catch (error) {
        throw new Error('Error uploading attachments: ' + error.message);
      }
    }

    return { attachmentUrls, imageUrls };
  }
}
