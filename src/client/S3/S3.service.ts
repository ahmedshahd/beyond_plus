import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3Client = new S3({
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  constructor(private readonly configService: ConfigService) {}
  async upload(fileName: string, folder: string, file: Buffer) { 
   const key = `${folder}/${fileName}`;
    const params = {
      Bucket: 'beyond-plus-mobile-app',
      Key: key,
      Body: file,
    };
    return await this.s3Client.upload(params).promise();
  }
}
