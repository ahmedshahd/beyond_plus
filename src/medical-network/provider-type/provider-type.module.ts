import { Module } from '@nestjs/common';
import { ProviderTypeService } from './provider-type.service';
import { ProviderTypeResolver } from './provider-type.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ProviderTypeResolver, ProviderTypeService, PrismaService],
})
export class ProviderTypeModule {}
