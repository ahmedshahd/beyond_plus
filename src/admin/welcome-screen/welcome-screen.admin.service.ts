import { LanguageEnum } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWelcomeScreenInput } from './dto/create-welcome-screen.input';
import { UpdateWelcomeScreenInput } from './dto/update-welcome-screen.input';
@Injectable()
export class WelcomeScreenAdminService {
  constructor(private prisma: PrismaService) {}

  async create(
    createWelcomeScreenInput: CreateWelcomeScreenInput,
    language: LanguageEnum,
  ) {
    return await this.prisma.welcomeScreen.create({
      data: {
        language,
        ...createWelcomeScreenInput,
      },
    });
  }

  async findAll(language: LanguageEnum) {
    return await this.prisma.welcomeScreen.findMany({
      where: {
        language,
      },
    });
  }

  async update(updateWelcomeScreenInput: UpdateWelcomeScreenInput) {
    return await this.prisma.welcomeScreen.update({
      where: {
        id: updateWelcomeScreenInput.id,
      },
      data: {
        ...updateWelcomeScreenInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.welcomeScreen.delete({
      where: {
        id,
      },
    });
  }
}
