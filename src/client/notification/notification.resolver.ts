import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { CreateNotificationInput } from './dto/create-notification.input';

@Resolver('Notification')
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation('createNotification')
  create(
    @Args('createNotificationInput')
    createNotificationInput: CreateNotificationInput,
  ) {
    return this.notificationService.create(createNotificationInput);
  }

  @Query('notification')
  findAll() {
    return this.notificationService.findAll();
  }

  @Query('notification')
  getAllNotificationByUserId(@Args('userId') userId: number) {
    return this.notificationService.getAllNotificationByUserId(userId);
  }

  @Mutation('removeNotification')
  remove(@Args('id') id: number) {
    return this.notificationService.remove(id);
  }
}
