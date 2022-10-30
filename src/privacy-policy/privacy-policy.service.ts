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
        text:createPrivacyPolicyInput.text
      }
    })
  }


  findAll(language: LanguageEnum) {
    return this.prisma.privacyPolicy.findMany({
      where:{
        language
      }
    })
  }

 

  update(updatePrivacyPolicyInput: UpdatePrivacyPolicyInput) {
    return this.prisma.privacyPolicy.update({
      where: {
        id : updatePrivacyPolicyInput.id
      },
      data: {
        text:updatePrivacyPolicyInput.text

      }
    })}

  remove(id: number) {
    return   this.prisma.privacyPolicy.delete({
      where: {
        id
      }
    })}

  }

