import { Module } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UserAddressResolver } from './user-address.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserAddressResolver, UserAddressService, PrismaService],
})
export class UserAddressModule {}
