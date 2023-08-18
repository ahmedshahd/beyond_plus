import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { S3Service } from 'src/client/S3/S3.service';
import * as sharp from 'sharp';
import { parse } from 'path';

@Injectable()
export class ImageThumbnailService {
  constructor(private readonly s3Service: S3Service) {}

  async generateImageThumbnail(fileStream) {
    return await fileStream.pipe(sharp().resize({ width: 100, height: 100 }).toFormat('jpeg', { mozjpeg: true })
    .jpeg(),);
  }

  async uploadImageThumbnail(fileStream, filename, userProfileUuid, serviceName) {
    const imageThumbnailStream = await this.generateImageThumbnail(fileStream);
    const uniqueFilename = `${Date.now()}-${parse(filename).name}.jpeg`;
    const thumbnailFilename = `thumbnail-${uniqueFilename}`;
    const thumbnailPath = `users/${userProfileUuid}/${serviceName}/images`;
    const thumbnailUploadResponse = await this.s3Service.upload(
      thumbnailFilename,
      thumbnailPath,
      imageThumbnailStream,
    );
    const thumbnailLocation = thumbnailUploadResponse.Location;
    return thumbnailLocation;
  }
}
