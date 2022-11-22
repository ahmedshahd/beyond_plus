import { Module } from '@nestjs/common';
import { UserAdminService } from './user.admin.service';
import { UserAdminResolver } from './user.admin.resolver';
import { KeycloakModule } from '../../keycloak/keycloak.module';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [KeycloakModule],
  providers: [UserAdminResolver, UserAdminService, PrismaService],
})
export class UserAdminModule {}
