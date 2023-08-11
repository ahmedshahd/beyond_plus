import { Injectable } from '@nestjs/common';
import { CreateUserAddressInput } from './dto/create-user-address.input';
import { UpdateUserAddressInput } from './dto/update-user-address.input';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserAddressService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserAddressInput: CreateUserAddressInput) {
    try {
      return await this.prisma.userAddress.create({
        data: createUserAddressInput,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new Error('There is already an address with the same name');
      } else {
        throw error; // Re-throw the original error for unhandled cases
      }
    }
  }

  async findAdresses(uuid: string) {
    return await this.prisma.userAddress.findMany({
      where: { userProfileUuid: uuid },
      include: {
        userProfile: true,
      },
    });
  }

  async findAdress(id: number) {
    return await this.prisma.userAddress.findFirst({
      where: { id },
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
