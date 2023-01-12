import { Module } from '@nestjs/common';
import { UserAdminService } from './user.admin.service';
import { UserAdminResolver } from './user.admin.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [],
  providers: [UserAdminResolver, UserAdminService, PrismaService],
})
export class UserAdminModule {}
