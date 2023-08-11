import { Module } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UserAddressResolver } from './user-address.resolver';
import { PrismaService } from 'src/prisma.service';
import { CityClientService } from '../city/city.client.service';
import { AreaClientService } from '../area/area.client.service';

@Module({
  providers: [
    UserAddressResolver,
    UserAddressService,
    PrismaService,
    CityClientService,
    AreaClientService,
  ],
})
export class UserAddressModule {}
