import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { S3Service } from 'src/client/S3/S3.service';
import * as sharp from 'sharp';
import { parse } from 'path';
import { ImageResizeService } from './image-resize.service';

@Injectable()
export class ImageThumbnailService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly imageResizeService: ImageResizeService,
  ) {}



  async uploadImageThumbnail(
    fileStream,
    filename,
    userProfileUuid,
    serviceName,
  ) {
    const imageThumbnailStream = await this.imageResizeService.thumbnail(fileStream);
    console.log("imageThumbnailStream", imageThumbnailStream);
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

  async uploadGlobalImageThumbnail(fileStream, filename, serviceName) {
    const imageThumbnailStream = await this.imageResizeService.thumbnail(fileStream);
    const uniqueFilename = `${Date.now()}-${parse(filename).name}.jpeg`;
    const thumbnailFilename = `thumbnail-${uniqueFilename}`;
    const thumbnailPath = `${serviceName}/images`;
    const thumbnailUploadResponse = await this.s3Service.upload(
      thumbnailFilename,
      thumbnailPath,
      imageThumbnailStream,
    );
    const thumbnailLocation = thumbnailUploadResponse.Location;
    return thumbnailLocation;
  }
}
