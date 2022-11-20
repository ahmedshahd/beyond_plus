import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { KeycloakModule } from '../../keycloak/keycloak.module';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [KeycloakModule],
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
