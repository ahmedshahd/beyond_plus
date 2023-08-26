import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { SendNotificationToDeviceInput } from './dto/single-device-notification.input';
import { SendNotificationToMultipleDevicesInput } from './dto/multiple-device--notification.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver('Notification')
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Mutation('sendNotificationToDevice')
  create(
    @Args('sendNotificationToDeviceInput')
    sendNotificationToDeviceInput: SendNotificationToDeviceInput,
    @Args('image', { type: () => [GraphQLUpload] })
    image?: FileUpload,
  ) {
    const { uuid, title, body } = sendNotificationToDeviceInput;
    return this.notificationsService.sendNotificationToDevice(
      uuid,
      title,
      body,
      image,
    );
  }

  @Mutation('sendNotificationToMultipleDevices')
  update(
    @Args('sendNotificationToMultipleDevicesInput')
    sendNotificationToMultipleDevicesInput: SendNotificationToMultipleDevicesInput,
    @Args('image', { type: () => [GraphQLUpload] })
    image?: FileUpload,
  ) {
    const { title, body } = sendNotificationToMultipleDevicesInput;

    return this.notificationsService.sendNotificationToMultipleDevices(
      title,
      body,
      image,
    );
  }
}
