import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/client/S3/S3.service';
import { fromBuffer } from 'pdf2pic';
import * as fs from 'fs';
import { Readable } from 'stream';
import { parse } from 'path';

@Injectable()
export class PdfThumbnailService {
  constructor(private readonly s3Service: S3Service) {}

  async streamToBuffer(stream) {
    const chunks = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  }

  async generatePdfThumbnail(fileStream, filename): Promise<any> {
    const uniqueFilename = `${Date.now()}-${parse(filename).name}`;
    const thumbnailFilename = `thumbnail-${uniqueFilename}`;
    console.log('before options');
    const options = {
      density: 100, // DPI (dots per inch) of the output image
      saveFilename: thumbnailFilename,
      format: 'jpeg', // Output image format
      size: '300x400', // Output image dimensions
      quality: 100, // Output image quality percentage
      // savePath: './public/files',
    };
    const thumbnailFileBuffer = await this.streamToBuffer(fileStream);
    const { path } = await fromBuffer(thumbnailFileBuffer, options)(1);
    console.log('path', path);
    const pdfThumbnailstream = fs.createReadStream(path);

    return { pdfThumbnailstream, path };
  }

  async uploadPdfThumbnail(fileStream, filename, userProfileUuid, serviceName) {
    const { pdfThumbnailstream, path } = await this.generatePdfThumbnail(
      fileStream,
      filename,
    );

    const uniqueFilename = `${Date.now()}-${parse(filename).name}.jpeg`;

    const thumbnailFilename = `thumbnail-${uniqueFilename}`;
    const thumbnailPath = `users/${userProfileUuid}/${serviceName}/attachments`;
    const thumbnailUploadResponse = await this.s3Service.upload(
      thumbnailFilename,
      thumbnailPath,
      pdfThumbnailstream,
    );
    const thumbnailLocation = thumbnailUploadResponse.Location;

    // fs.unlink(path, (err) => {
    //   if (err) {
    //     console.error('Error deleting file:', err);
    //     return;
    //   }
    //   console.log('File deleted successfully');
    // });

    return thumbnailLocation;
  }
}
