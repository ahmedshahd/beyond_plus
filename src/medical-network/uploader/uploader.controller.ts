import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './uploader.options';
import { Response } from 'express';
import { UploaderService } from './uploader.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LanguageEnum } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('uploader')
export class UploaderController {
  constructor(private uploaderService: UploaderService) {}

  @ApiHeader({
    name: 'API_KEY',
    example: '2ab9c3d4e5f91ab7c3d4e5f6',
    required: true,
    description: 'API_KEY',
  })
  @UseGuards(AuthGuard('api-key'))
  @ApiQuery({
    name: 'language',
    type: 'string',
    example: 'ENGLISH',
    required: true,
  })
  @ApiQuery({
    name: 'tpaName',
    type: 'string',
    example: 'AXA',
    required: true,
  })
  @ApiQuery({
    name: 'insuranceCompanyName',
    type: 'string',
    example: 'CompanyA',
    required: true,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('language') language: LanguageEnum,
    @Query('tpaName') tpaName: string,
    @Query('insuranceCompanyName') insuranceCompanyName: string,
    @Res() res: Response,
  ) {
    try {
      if (!file) {
        throw new HttpException(`File must be send`, HttpStatus.BAD_REQUEST);
      }

      await this.uploaderService.parseUploadedFile(
        file.path,
        language,
        tpaName,
        insuranceCompanyName,
      );
      res.json({
        statusCode: 201,
        message: 'File Uploaded Successfully',
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
