import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';

@Injectable()
export class AddressClientService {
  constructor(private prisma: PrismaService) {}

  create(createAddressInput: CreateAddressInput) {
    return this.prisma.address.create({
      data: {
        ...createAddressInput,
      },
    });
  }

  findAll() {
    return this.prisma.address.findMany();
  }

  findOne(id: number) {
    return this.prisma.address.findUnique({ where: { id } });
  }

  update(id: number, updateAddressInput: UpdateAddressInput) {
    return this.prisma.address.update({
      where: {
        id: updateAddressInput.id,
      },
      data: {
        ...updateAddressInput,
      },
    });
  }

  remove(id: number) {
    return this.prisma.address.delete({
      where: {
        id,
      },
    });
  }
}
