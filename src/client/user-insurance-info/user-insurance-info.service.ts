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
    const { createReadStream, filename, mimetype } = await cardImage.promise;
    const fileStream = createReadStream();
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}-${filename}`;
    try {
      // Upload the image to S3
      const bucketName = 'beyond-plus-user-images';
      await this.s3Service.upload(uniqueFilename, 'card-images', fileStream);

      // Generate the S3 object URL
      const imageUrl = `https://${bucketName}.s3.amazonaws.com/card-images/${uniqueFilename}`;

      console.log('imageUrl', imageUrl);

      // Save the image URL in the Prisma database
      return await this.prisma.userInsuranceInfo.create({
        data: {
          userProfileUuid: createUserInsuranceInfoInput.userProfileUuid,
          cardImgUrl: imageUrl,
          cardNumber: createUserInsuranceInfoInput.cardNumber,
          companyAddress: createUserInsuranceInfoInput.companyAddress,
          insuranceCompany: createUserInsuranceInfoInput.insuranceCompany,
          tpa: createUserInsuranceInfoInput.tpa,
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
    const { createReadStream, filename, mimetype } = await cardImage.promise;
    const fileStream = createReadStream();
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}-${filename}`;
    try {
      // Upload the image to S3
      const bucketName = 'beyond-plus-user-images';
      await this.s3Service.upload(uniqueFilename, 'card-images', fileStream);

      // Generate the S3 object URL
      const imageUrl = `https://${bucketName}.s3.amazonaws.com/card-images/${uniqueFilename}`;

      console.log('imageUrl', imageUrl);

      // Save the image URL in the Prisma database
      return await this.prisma.userInsuranceInfo.update({
        where: {
          id,
        },
        data: {
          cardImgUrl: imageUrl,
          cardNumber: updateUserInsuranceInfoInput.cardNumber,
          companyAddress: updateUserInsuranceInfoInput.companyAddress,
          insuranceCompany: updateUserInsuranceInfoInput.insuranceCompany,
          tpa: updateUserInsuranceInfoInput.tpa,
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
