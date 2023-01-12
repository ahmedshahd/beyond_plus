import { Module } from '@nestjs/common';
import { UserClientService } from './user.client.service';
import { UserClientResolver } from './user.client.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [],
  providers: [UserClientResolver, UserClientService, PrismaService],
})
export class UserClientModule {}
