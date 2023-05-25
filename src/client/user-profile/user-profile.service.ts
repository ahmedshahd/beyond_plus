import { Injectable } from '@nestjs/common';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserProfileService {
  constructor(private prisma: PrismaService) {}

  async create(createUserProfileInput: CreateUserProfileInput) {
    return await this.prisma.userProfile.create({
      data: createUserProfileInput,
    });
  }

  async findOne(uuid: string) {
    return await this.prisma.userProfile.findFirst({
      where: {
        uuid,
      },
    });
  }

  async update(uuid: string, updateUserProfileInput: UpdateUserProfileInput) {
    return await this.prisma.userProfile.update({
      where: {
        uuid,
      },
      data: updateUserProfileInput,
    });
  }

  async remove(uuid: string) {
    return await this.prisma.userProfile.delete({
      where: {
        uuid,
      },
    });
  }
}
