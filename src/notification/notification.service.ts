import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateNotificationInput } from './dto/create-notification.input';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  create(createNotificationInput: CreateNotificationInput) {
    return this.prisma.notification.create({
      data: {
        ...createNotificationInput,
      },
    });
  }

  findAll() {
    return this.prisma.notification.findMany();
  }

  getAllNotificationByUserId(userId: number) {
    return this.prisma.notification.findMany({
      where: {
        userId,
      },
    });
  }

  remove(id: number) {
    return this.prisma.notification.delete({ where: { id } });
  }
}
