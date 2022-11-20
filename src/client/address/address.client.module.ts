import { Module } from '@nestjs/common';
import { AddressClientService } from './address.client.service';
import { AddressClientResolver } from './address.client.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [AddressClientResolver, AddressClientService, PrismaService],
})
export class AddressClientModule {}
