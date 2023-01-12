import { Module } from '@nestjs/common';
import { AddressAdminService } from './address.admin.service';
import { AddressAdminResolver } from './address.admin.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [AddressAdminResolver, AddressAdminService, PrismaService],
})
export class AddressAdminModule {}
