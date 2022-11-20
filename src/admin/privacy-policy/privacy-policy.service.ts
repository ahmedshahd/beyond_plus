import { Injectable } from '@nestjs/common';
import { CreatePrivacyPolicyInput } from './dto/create-privacy-policy.input';
import { UpdatePrivacyPolicyInput } from './dto/update-privacy-policy.input';
import { PrismaService } from 'src/prisma.service';
import { LanguageEnum } from '@prisma/client';

@Injectable()
export class PrivacyPolicyService {
  constructor(private prisma: PrismaService) {}

  async create(createPrivacyPolicyInput: CreatePrivacyPolicyInput) {
    return await this.prisma.privacyPolicy.create({
      data: {
        ...createPrivacyPolicyInput
      }
    })
  }


  async findAll(language: LanguageEnum) {
    return await this.prisma.privacyPolicy.findMany({
      where:{
        language
      }
    })
  }

 

  async update(updatePrivacyPolicyInput: UpdatePrivacyPolicyInput) {
    return await this.prisma.privacyPolicy.update({
      where: {
        id : updatePrivacyPolicyInput.id
      },
      data: {
        ...updatePrivacyPolicyInput

      }
    })}

  async remove(id: number) {
    return   await this.prisma.privacyPolicy.delete({
      where: {
        id
      }
    })}

  }

