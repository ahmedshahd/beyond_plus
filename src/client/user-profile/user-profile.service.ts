import { Injectable } from '@nestjs/common';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from '../S3/S3.service';

@Injectable()
export class UserProfileService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(createUserProfileInput: CreateUserProfileInput, profileImg) {
    const { createReadStream, filename, mimetype } = await profileImg.promise;
    const fileStream = createReadStream();
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}-${filename}`;
    try {
      // Upload the image to S3
      const bucketName = 'beyond-plus-user-images';
      await this.s3Service.upload(
        uniqueFilename,
        'user-profile-images',
        fileStream,
      );

      // Generate the S3 object URL
      const imageUrl = `https://${bucketName}.s3.amazonaws.com/user-profile-images/${uniqueFilename}`;

      console.log('imageUrl', imageUrl);

      // Save the image URL in the Prisma database
      return await this.prisma.userProfile.create({
        data: {
          uuid: createUserProfileInput.uuid,
          phoneNumber: createUserProfileInput.phoneNumber,
          dateOfbirth: createUserProfileInput.dateOfbirth,
          email: createUserProfileInput.email,
          gender: createUserProfileInput.gender,
          name: createUserProfileInput.name,
          profileImgUrl: imageUrl,
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return false;
    }
  }

  async findOne(uuid: string) {
    return await this.prisma.userProfile.findFirst({
      where: {
        uuid,
      },
      include: {
        userInsuranceInfo: true,
        // address: true,
      },
    });
  }

  async update(
    uuid: string,
    updateUserProfileInput: UpdateUserProfileInput,
    profileImg,
  ) {
    const { createReadStream, filename, mimetype } = await profileImg.promise;
    const fileStream = createReadStream();
    // Generate a unique filename for the image
    const uniqueFilename = `${Date.now()}-${filename}`;
    try {
      // Upload the image to S3
      const bucketName = 'beyond-plus-user-images';
      await this.s3Service.upload(
        uniqueFilename,
        'user-profile-images',
        fileStream,
      );

      // Generate the S3 object URL
      const imageUrl = `https://${bucketName}.s3.amazonaws.com/user-profile-images/${uniqueFilename}`;

      console.log('imageUrl', imageUrl);

      // Save the image URL in the Prisma database
      return await this.prisma.userProfile.update({
        where: {
          uuid,
        },
        data: {
          phoneNumber: updateUserProfileInput.phoneNumber,
          dateOfbirth: updateUserProfileInput.dateOfbirth,
          email: updateUserProfileInput.email,
          gender: updateUserProfileInput.gender,
          name: updateUserProfileInput.name,
          profileImgUrl: imageUrl,
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return false;
    }
  }

  async remove(uuid: string) {
    return await this.prisma.userProfile.delete({
      where: {
        uuid,
      },
    });
  }
}
