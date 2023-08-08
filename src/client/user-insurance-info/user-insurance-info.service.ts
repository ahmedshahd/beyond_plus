import { Injectable } from '@nestjs/common';
import { CreateUserInsuranceInfoInput } from './dto/create-user-insurance-info.input';
import { UpdateUserInsuranceInfoInput } from './dto/update-user-insurance-info.input';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from '../S3/S3.service';
import * as sharp from 'sharp';
import { parse } from 'path';

@Injectable()
export class UserInsuranceInfoService {
  constructor(
    private prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  // async create(
  //   createUserInsuranceInfoInput: CreateUserInsuranceInfoInput,
  //   cardImage,
  // ) {
  //   const { userProfileUuid: uuid } = createUserInsuranceInfoInput;
  //   try {
  //     if (!cardImage) {
  //       return await this.prisma.userInsuranceInfo.create({
  //         data: {
  //           ...createUserInsuranceInfoInput,
  //         },
  //       });
  //     }

  //     const { createReadStream, filename } = await cardImage.promise;

  //     const resizedImageStream = createReadStream().pipe(
  //       sharp()
  //         .resize({ width: 600, height: 400 })
  //         .toFormat('jpeg', { mozjpeg: true })
  //         .jpeg(),
  //     );
  //     // Generate a unique filename for the image
  //     const uniqueFilename = `${Date.now()}-${parse(filename).name}.jpeg`;

  //     // Upload the image to S3
  //     const { Location: cardImgUrl } = await this.s3Service.upload(
  //       uniqueFilename,
  //       `users/${uuid}/insurance-info/card-images`,
  //       resizedImageStream,
  //     );

  //     // Generate the S3 object URL

  //     // Save the image URL in the Prisma database
  //     return await this.prisma.userInsuranceInfo.create({
  //       data: {
  //         cardImgUrl,
  //         ...createUserInsuranceInfoInput,
  //       },
  //     });
  //   } catch (error) {
  //     if (error.code === 'P2002' && error.meta?.target?.includes('userProfileUuid')) {
  //       throw new Error('The user already have an insurance info');
  //     }
  //    else if (
  //       error.code === 'P2003'
  //     ) {
  //       throw new Error('User with this uuid does not exist');
  //     }
  //     console.error('Error creating user Insurance Info:', error);
  //     return false;
  //   }
  // }

  async create(
    createUserInsuranceInfoInput: CreateUserInsuranceInfoInput,
    cardImage,
  ) {
    const { userProfileUuid: uuid } = createUserInsuranceInfoInput;
    try {
      let cardImgUrl = null;

      if (cardImage) {
        const { createReadStream, filename } = await cardImage.promise;
        const resizedImageStream = createReadStream().pipe(
          sharp()
            .resize({ width: 600, height: 400 })
            .toFormat('jpeg', { mozjpeg: true })
            .jpeg(),
        );
        // Generate a unique filename for the image
        const uniqueFilename = `${Date.now()}-${parse(filename).name}.jpeg`;

        // Upload the image to S3
        const { Location } = await this.s3Service.upload(
          uniqueFilename,
          `users/${uuid}/insurance-info/card-images`,
          resizedImageStream,
        );

        cardImgUrl = Location;
      }

      // Create the user insurance info in the Prisma database
      const userInsuranceInfo = await this.prisma.userInsuranceInfo.create({
        data: {
          cardImgUrl,
          ...createUserInsuranceInfoInput,
        },
      });

      return userInsuranceInfo;
    } catch (error) {
      if (
        error.code === 'P2002' &&
        error.meta?.target?.includes('userProfileUuid')
      ) {
        throw new Error('The user already have an insurance info');
      } else if (error.code === 'P2003') {
        throw new Error('User with this uuid does not exist');
      }
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

  // async update(
  //   id: number,
  //   updateUserInsuranceInfoInput: UpdateUserInsuranceInfoInput,
  //   cardImage,
  // ) {
  //   try {
  //     if (!cardImage) {
  //       return await this.prisma.userInsuranceInfo.update({
  //         where: {
  //           id,
  //         },
  //         data: {
  //           ...updateUserInsuranceInfoInput,
  //         },
  //         include: {
  //           userProfile: true,
  //         },
  //       });
  //     }

  //     const { createReadStream, filename } = await cardImage.promise;
  //     const resizedImageStream = createReadStream().pipe(
  //       sharp()
  //         .resize({ width: 600, height: 400 })
  //         .toFormat('jpeg', { mozjpeg: true })
  //         .jpeg(),
  //     );
  //     // Generate a unique filename for the image
  //     const uniqueFilename = `${Date.now()}-${parse(filename).name}.jpeg`;
  //     // get user uuid from the insurance info table
  //     const { userProfileUuid: uuid } =
  //       await this.prisma.userInsuranceInfo.findFirst({
  //         where: {
  //           id,
  //         },
  //       });
  //     // Upload the image to S3
  //     const { Location: cardImgUrl } = await this.s3Service.upload(
  //       uniqueFilename,
  //       `users/${uuid}/insurance-info/card-images`,
  //       resizedImageStream,
  //     );

  //     // Generate the S3 object URL
  //     // Save the image URL in the Prisma database
  //     return await this.prisma.userInsuranceInfo.update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         cardImgUrl,
  //         ...updateUserInsuranceInfoInput,
  //       },
  //       include: {
  //         userProfile: true,
  //       },
  //     });
  //   } catch (error) {
  //     if (error.code === 'P2003') {
  //       throw new Error('There is no user with this uuid');
  //     }
  //     console.error('Error Updating user Insurance Info:', error);
  //     return false;
  //   }
  // }
  async update(
    id: number,
    updateUserInsuranceInfoInput: UpdateUserInsuranceInfoInput,
    cardImage,
  ) {
    try {
      let cardImgUrl = null;
  
      if (cardImage) {
        const { createReadStream, filename } = await cardImage.promise;
        const resizedImageStream = createReadStream().pipe(
          sharp()
            .resize({ width: 600, height: 400 })
            .toFormat('jpeg', { mozjpeg: true })
            .jpeg(),
        );
        // Generate a unique filename for the image
        const uniqueFilename = `${Date.now()}-${parse(filename).name}.jpeg`;
        
        // Get user uuid from the insurance info table
        const userInsuranceInfo = await this.prisma.userInsuranceInfo.findFirst({
          where: {
            id,
          },
          select: {
            userProfileUuid: true,
          },
        });
        
        if (!userInsuranceInfo) {
          throw new Error('There is no user insurance info with this id');
        }
  
        // Upload the image to S3
        const { Location } = await this.s3Service.upload(
          uniqueFilename,
          `users/${userInsuranceInfo.userProfileUuid}/insurance-info/card-images`,
          resizedImageStream,
        );
  
        cardImgUrl = Location;
      }
  
      // Update the user insurance info in the Prisma database
      const updatedUserInsuranceInfo = await this.prisma.userInsuranceInfo.update({
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
  
      return updatedUserInsuranceInfo;
    } catch (error) {
          if (error.code === 'P2003') {
            throw new Error('There is no user with this uuid');
          }
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
