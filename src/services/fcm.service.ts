import { Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class FcmService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async sendNotificationToDevice(
    deviceToken: string,
    title: string,
    body: string,
    image?: string,
  ): Promise<string> {
    const imageUrl = image == '' ? undefined : image;
    const message = {
      notification: {
        title,
        body,
        imageUrl,
      },
      token: deviceToken,
    };

    const result = await this.firebase.messaging.send(message);
    console.log('result', result);
    return result;
  }
  async sendNotificationToMultipleDevices(
    deviceTokens: string[],
    title: string,
    body: string,
    image?: string,
  ) {
    const imageUrl = image == '' ? undefined : image;

    const message = {
      notification: {
        title,
        body,
        imageUrl,
      },
      tokens: deviceTokens,
    };

    const result = await this.firebase.messaging.sendEachForMulticast(message);
    console.log('result', result);
    return result;
  }
}
