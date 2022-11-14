import { Injectable } from '@nestjs/common';
import { KeycloakAuthService } from '../keycloak/auth/keycloak-auth.service';
import { PrismaService } from '../prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private keycloakAuthService: KeycloakAuthService,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        ...createUserInput,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  login(loginUserInput: LoginUserInput) {
    return this.keycloakAuthService.userLogin(
      loginUserInput.username,
      loginUserInput.password,
    );
  }

  userAccessTokenFromRefreshToken(refreshToken: string) {
    return this.keycloakAuthService.userAccessTokenFromRefreshToken(
      refreshToken,
    );
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      data: {
        ...updateUserInput,
      },
      where: {
        id: updateUserInput.id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
