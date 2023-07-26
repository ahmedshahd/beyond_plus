import { Injectable } from '@nestjs/common';
import { CreateUserInsuranceInfoInput } from './dto/create-user-insurance-info.input';
import { UpdateUserInsuranceInfoInput } from './dto/update-user-insurance-info.input';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from '../S3/S3.service';

@Injectable()
export class UserInsuranceInfoService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    createUserInsuranceInfoInput: CreateUserInsuranceInfoInput,
    cardImage,
  ) {
    if (!cardImage) {
      return await this.prisma.userInsuranceInfo.create({
        data: {
          ...createUserInsuranceInfoInput,
        },
      });
    }

    const { createReadStream, filename, mimetype } = await cardImage.promise;
    const fileStream = createReadStream();
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}-${filename}`;
    try {
      // Upload the image to S3
      const { Location: cardImgUrl } = await this.s3Service.upload(
        uniqueFilename,
        'card-images',
        fileStream,
      );

      // Generate the S3 object URL

      // Save the image URL in the Prisma database
      return await this.prisma.userInsuranceInfo.create({
        data: {
          cardImgUrl,
          ...createUserInsuranceInfoInput,
        },
      });
    } catch (error) {
      console.error('Error creating user Insurance Info:', error);
      return false;
    }
  }

  async findOne(uuid: string) {
    return await this.prisma.userInsuranceInfo.findFirst({
      where: {
        userProfileUuid: uuid,
      },
      include: {
        userProfile: true,
      },
    });
  }

  async update(
    id: number,
    updateUserInsuranceInfoInput: UpdateUserInsuranceInfoInput,
    cardImage,
  ) {
    if (!cardImage) {
      return await this.prisma.userInsuranceInfo.update({
        where: {
          id,
        },
        data: {
          ...updateUserInsuranceInfoInput,
        },
        include: {
          userProfile: true,
        },
      });
    }

    const { createReadStream, filename, mimetype } = await cardImage.promise;
    const fileStream = createReadStream();
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}-${filename}`;
    try {
      // Upload the image to S3
      const { Location: cardImgUrl } = await this.s3Service.upload(
        uniqueFilename,
        'card-images',
        fileStream,
      );

      // Generate the S3 object URL
      // Save the image URL in the Prisma database
      return await this.prisma.userInsuranceInfo.update({
        where: {
          id,
        },
        data: {
          cardImgUrl,
          ...updateUserInsuranceInfoInput,
        },
        include: {
          userProfile: true,
        },
      });
    } catch (error) {
      console.error('Error Updating user Insurance Info:', error);
      return false;
    }
  }

  async remove(id: number) {
    return await this.prisma.userInsuranceInfo.delete({
      where: {
        id,
      },
    });
  }
}
