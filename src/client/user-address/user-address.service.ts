import { Injectable } from '@nestjs/common';
import { CreateUserAddressInput } from './dto/create-user-address.input';
import { UpdateUserAddressInput } from './dto/update-user-address.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserAddressService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserAddressInput: CreateUserAddressInput) {
    return await this.prisma.userAddress.create({
      data: createUserAddressInput,
    });
  }

  async findOne(uuid: string) {
    return await this.prisma.userAddress.findMany({
      where: { userProfileUuid: uuid },
      include: {
        userProfile: true,
      },
    });
  }

  async update(id: number, updateUserAddressInput: UpdateUserAddressInput) {
    return await this.prisma.userAddress.update({
      where: {
        id,
      },
      data: updateUserAddressInput,
    });
  }

  async remove(id: number) {
    return await this.prisma.userAddress.delete({
      where: {
        id,
      },
    });
  }
}
