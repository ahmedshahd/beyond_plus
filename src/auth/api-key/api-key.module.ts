import { Module } from '@nestjs/common';
import { ApiKeyController } from './api-key.controller';
import { ApiKeyService } from './api-key.service';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './api-key.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PassportModule, ConfigModule],
  controllers: [ApiKeyController],
  providers: [ApiKeyService,HeaderApiKeyStrategy]
})
export class ApiKeyModule {}
