import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { S3Service } from 'src/client/S3/S3.service';

@Injectable()
export class ProcessAttachmentsService {
  constructor(private readonly s3Service: S3Service) {}

  async processAttachments(attachments: FileUpload[], userProfileUuid: string) {
    const attachmentUrls = [];
    const imageUrls = [];

    if (attachments) {
      await Promise.all(
        attachments.map(async (attachment) => {
          const { createReadStream, filename, mimetype } =
            await attachment.promise;

          console.log('mimetype', mimetype);
          const fileStream = createReadStream();
          const uniqueFilename = `${Date.now()}-${filename}`;
          const s3Folder =
            mimetype !== 'image/png' && mimetype !== 'image/jpeg'
              ? 'attachments'
              : 'images';

          const { Location } = await this.s3Service.upload(
            uniqueFilename,
            `users/${userProfileUuid}/wellness-tips/${s3Folder}`,
            fileStream,
          );

          if (s3Folder === 'attachments') {
            attachmentUrls.push(Location);
          } else {
            imageUrls.push(Location);
          }
        }),
      );
    }

    return { attachmentUrls, imageUrls };
  }
}
