import { Injectable } from '@nestjs/common';
import { CreateUserInsuranceInfoInput } from './dto/create-user-insurance-info.input';
import { UpdateUserInsuranceInfoInput } from './dto/update-user-insurance-info.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserInsuranceInfoService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInsuranceInfoInput: CreateUserInsuranceInfoInput) {
    return await this.prisma.userInsuranceInfo.create({
      data: createUserInsuranceInfoInput,
    });
  }

  async findOne(uuid: string) {
    return await this.prisma.userInsuranceInfo.findFirst({
      where: {
        userProfileUuid: uuid,
      },
    });
  }

  async update(
    id: number,
    updateUserInsuranceInfoInput: UpdateUserInsuranceInfoInput,
  ) {
    return await this.prisma.userInsuranceInfo.update({
      where: {
        id,
      },
      data: updateUserInsuranceInfoInput,
    });
  }

  async remove(id: number) {
    return await this.prisma.userInsuranceInfo.delete({
      where: {
        id,
      },
    });
  }
}
