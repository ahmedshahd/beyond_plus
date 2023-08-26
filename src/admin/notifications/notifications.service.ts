import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/client/S3/S3.service';
import { UserProfileService } from 'src/client/user-profile/user-profile.service';
import { FcmService } from 'src/services/fcm.service';
import { FileUpload } from 'graphql-upload';
import * as sharp from 'sharp';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly fcmService: FcmService,
    private readonly s3Service: S3Service,
  ) {}
  async sendNotificationToMultipleDevices(
    title: string,
    body: string,
    image?: FileUpload,
  ) {
    const allUsers = await this.userProfileService.findAll();
    const registrationTokens = allUsers
      .map((user) => user.registrationToken)
      .filter(Boolean);
    let imageUrl: string | undefined;
    if (image) {
      try {
        imageUrl = await this.uploadAndProcessImage(image);
      } catch (error) {
        console.log('Error in image processing or uploading:', error);
        throw error;
      }
    }

    const notifiyUsers =
      await this.fcmService.sendNotificationToMultipleDevices(
        registrationTokens,
        title,
        body,
        imageUrl,
      );
    console.log('notifiyUsers', notifiyUsers);

    return {
      successCount: notifiyUsers.successCount,
      failureCount: notifiyUsers.failureCount,
    };
  }

  async sendNotificationToDevice(
    uuid: string,
    title: string,
    body: string,
    image?: FileUpload,
  ) {
    const { registrationToken } = await this.userProfileService.findOne(uuid);

    let imageUrl: string | undefined;

    if (image) {
      try {
        imageUrl = await this.uploadAndProcessImage(image);
      } catch (error) {
        console.log('Error in image processing or uploading:', error);
        throw error;
      }
    }

    const notifiyUser = await this.fcmService.sendNotificationToDevice(
      registrationToken,
      title,
      body,
      imageUrl,
    );

    return notifiyUser;
  }

  private async uploadAndProcessImage(image: FileUpload): Promise<string> {
    const { createReadStream, filename } = await image.promise;

    const resizedImageStream = createReadStream().pipe(
      sharp()
        .resize({ width: 200, height: 200 })
        .toFormat('jpeg', { mozjpeg: true })
        .jpeg(),
    );

    const uniqueFilename = `${Date.now()}-${filename}.jpeg`;

    const { Location } = await this.s3Service.upload(
      uniqueFilename,
      'notifications/images',
      resizedImageStream,
    );

    return Location;
  }
}
