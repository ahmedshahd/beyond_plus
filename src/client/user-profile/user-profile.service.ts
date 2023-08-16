import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserProfileInput } from './dto/create-user-profile.input';
import { UpdateUserProfileInput } from './dto/update-user-profile.input';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from '../S3/S3.service';
import * as sharp from 'sharp';
import { parse, extname } from 'path';

@Injectable()
export class UserProfileService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(createUserProfileInput: CreateUserProfileInput, profileImg?) {
    const { uuid } = createUserProfileInput;

    try {
      let profileImgUrl = null;

      if (profileImg) {
        const { createReadStream, filename } = await profileImg.promise;
        const resizedImageStream = createReadStream().pipe(
          sharp()
            .resize({ width: 200, height: 200 })
            .toFormat('jpeg', { mozjpeg: true })
            .jpeg(),
        );
        // Generate a unique filename for the image
        const uniqueFilename = `${Date.now()}-${parse(filename).name}.jpeg`;

        // Upload the image to S3
        const { Location } = await this.s3Service.upload(
          uniqueFilename,
          `users/${uuid}/profile-picture`,
          resizedImageStream,
        );

        profileImgUrl = Location;
      }

      // Create the user profile in the Prisma database
      const userProfile = await this.prisma.userProfile.create({
        data: {
          profileImgUrl,
          ...createUserProfileInput,
        },
        include: {
          // address: true,
          userInsuranceInfo: true,
        },
      });

      return userProfile;
    } catch (error) {
      // Check if the error code indicates a duplicate UUID
      if (error.code === 'P2002' && error.meta?.target?.includes('uuid')) {
        throw new HttpException('The user already exists', HttpStatus.CONFLICT);
      } else {
        console.error('Error creating user:', error);
        return false;
      }
    }
  }

  async findOne(uuid: string) {
    try {
      console.log('here', uuid);
      const user = await this.prisma.userProfile.findFirst({
        where: {
          uuid,
        },
        include: {
          userInsuranceInfo: true,
          // address: true,
        },
      });
      if (!user) {
        // Handle the case where no user is found
        return null; // You can return null or any other value that makes sense
      }

      return user;
    } catch (error) {
      console.log('error finding user', error);
      throw new Error('Error finding user');
    }
  }

  async findAll(phoneNumber?: string) {
    if (!phoneNumber) {
      return this.prisma.userProfile.findMany({
        include: {
          userInsuranceInfo: true,
          // address: true,
        },
      });
    }
    return this.prisma.userProfile.findMany({
      where: {
        phoneNumber: {
          contains: phoneNumber,
          mode: 'insensitive',
        },
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
    profileImg?,
  ) {
    try {
      let profileImgUrl = null;

      if (profileImg) {
        const { createReadStream, filename } = await profileImg.promise;
        const resizedImageStream = createReadStream().pipe(
          sharp()
            .resize({ width: 200, height: 200 })
            .toFormat('jpeg', { mozjpeg: true })
            .jpeg(),
        );
        // Generate a unique filename for the image
        const uniqueFilename = `${Date.now()}-${parse(filename).name}.jpeg`;
        // Upload the image to S3
        const { Location } = await this.s3Service.upload(
          uniqueFilename,
          `users/${uuid}/user-profile/profile-picture`,
          resizedImageStream,
        );

        profileImgUrl = Location;
      }

      // Update the user profile in the Prisma database
      const updatedUserProfile = await this.prisma.userProfile.update({
        where: {
          uuid,
        },
        data: {
          profileImgUrl,
          ...updateUserProfileInput,
        },
      });

      return updatedUserProfile;
    } catch (error) {
      console.error('Error updating user:', error);
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
  async removeAll() {
    try {
      await this.prisma.userProfile.deleteMany({});
      return 'All user profiles have been deleted.';
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete user profiles.');
    }
  }
}
