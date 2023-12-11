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
import { CsvUploaderService } from './csv-uploader.service';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiQuery,
} from '@nestjs/swagger';
import { LanguageEnum } from '@prisma/client';
import { multerOptions } from './uploader.options';

@Controller('csv-uploader')
export class CsvUploaderController {
  constructor(private readonly csvUploaderService: CsvUploaderService) {}

  @ApiHeader({
    name: 'api-key',
    example: '2ab9c3d4e5f91ab7c3d4e5f6',
    required: true,
    description: 'api-key',
  })
  // @UseGuards(AuthGuard('api-key'))
  @ApiQuery({
    name: 'language',
    type: 'string',
    example: 'ENGLISH',
    required: true,
  })
  @ApiQuery({
    name: 'tpaName',
    type: 'string',
    example: 'frowSwaggerWithoutBull',
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

      await this.csvUploaderService.parseUploadedFile(
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
      console.log(error);
      throw new HttpException(
        { reason: 'error in try catch block of uploader controller' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
