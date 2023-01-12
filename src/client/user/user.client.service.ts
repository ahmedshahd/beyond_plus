import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login.input';
import { UpdateUserInput } from './dto/update-user.input';
import { nanoid } from 'nanoid';
import { ResetPasswordUserInput } from './dto/reset-password.input';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UserClientService {
  constructor(private prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        ...createUserInput,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
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
}
