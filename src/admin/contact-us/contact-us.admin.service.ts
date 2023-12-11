import { Injectable } from '@nestjs/common';
import { CreateContactUsInput } from './dto/create-contact-us.input';
import { UpdateContactUsInput } from './dto/update-contact-us.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ContactUsAdminService {
  constructor(private prisma: PrismaService) {}

  async create(createContactUsInput: CreateContactUsInput) {
    return await this.prisma.contactUs.create({
      data: {
        ...createContactUsInput,
      },
    });
  }

  async findAll() {
    return await this.prisma.contactUs.findMany({});
  }

  async update(updateContactUsInput: UpdateContactUsInput) {
    return await this.prisma.contactUs.update({
      where: {
        id: updateContactUsInput.id,
      },
      data: {
        ...updateContactUsInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.contactUs.delete({
      where: {
        id,
      },
    });
  }
}
