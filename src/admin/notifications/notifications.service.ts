import { Injectable, NotFoundException } from '@nestjs/common';
import { S3Service } from 'src/client/S3/S3.service';
import { UserProfileService } from 'src/client/user-profile/user-profile.service';
import { FcmService } from 'src/services/fcm.service';
import { ImageResizeService } from 'src/services/image-resize.service';
import { FileUpload } from 'graphql-upload';
import { UserRegistrationTokenService } from 'src/client/user-registration-token/user-registration-token.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly fcmService: FcmService,
    private readonly s3Service: S3Service,
    private readonly imageResizeService: ImageResizeService,
    private readonly userRegistrationTokenService: UserRegistrationTokenService,
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
    try {
      const notifiyUsers =
        await this.fcmService.sendNotificationToMultipleDevices(
          registrationTokens,
          title,
          body,
          imageUrl,
        );
      console.log(
        'notifiyUsers',
        notifiyUsers.responses.filter((response) => {
          return response.success !== true;
        }),
      );
      return {
        successCount: notifiyUsers.successCount,
        failureCount: notifiyUsers.failureCount,
      };
    } catch (error) {
      console.log('error', error);
    }
  }

  async sendNotificationToDevice(
    uuid: string,
    title: string,
    body: string,
    image?: FileUpload,
  ) {
    const userProfile = await this.userProfileService.findOne(uuid);

    if (!userProfile) {
      throw new NotFoundException('User not found');
    }

    const { registrationToken } = userProfile;

    if (!registrationToken) {
      throw new Error("This user doesn't have a registration token");
    }

    let imageUrl: string | undefined;

    if (image) {
      try {
        imageUrl = await this.uploadAndProcessImage(image);
      } catch (error) {
        console.log('Error in image processing or uploading:', error);
        throw error;
      }
    }

    try {
      const notifiyUser = await this.fcmService.sendNotificationToDevice(
        registrationToken,
        title,
        body,
        imageUrl,
      );

      return notifiyUser;
    } catch (error) {
      if (
        error.message ===
          'The registration token is not a valid FCM registration token' ||
        error.code === 'messaging/registration-token-not-registered'
      ) {
        await this.userRegistrationTokenService.remove(uuid);
        throw Error(
          'This user had an invalid registration token, and it has been deleted',
        );
      }
    }
  }

  private async uploadAndProcessImage(image: FileUpload): Promise<string> {
    const { createReadStream, filename } = await image.promise;

    const thumbnailStream = await this.imageResizeService.thumbnail(
      createReadStream(),
    );

    const uniqueFilename = `${Date.now()}-${filename}.jpeg`;

    const { Location } = await this.s3Service.upload(
      uniqueFilename,
      'notifications/images',
      thumbnailStream,
    );

    return Location;
  }
}
