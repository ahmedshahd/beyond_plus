import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotificationClientService } from './notification.client.service';
import { CreateNotificationInput } from './dto/create-notification.input';

@Resolver('Notification')
export class NotificationClientResolver {
  constructor(
    private readonly notificationClientService: NotificationClientService,
  ) {}

  @Mutation('createNotification')
  create(
    @Args('createNotificationInput')
    createNotificationInput: CreateNotificationInput,
  ) {
    return this.notificationClientService.create(createNotificationInput);
  }

  @Query('notification')
  findAll() {
    return this.notificationClientService.findAll();
  }

  @Query('notification')
  getAllNotificationByUserId(@Args('userId') userId: number) {
    return this.notificationClientService.getAllNotificationByUserId(userId);
  }

  @Mutation('removeNotification')
  remove(@Args('id') id: number) {
    return this.notificationClientService.remove(id);
  }
}
