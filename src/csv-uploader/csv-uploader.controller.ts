import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiBody, ApiConsumes, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { LanguageEnum } from '@prisma/client';
import { multerOptions } from './uploader.options';
import { fork } from 'child_process';
import { join } from 'path';
import { unlink } from 'fs';

@Controller('csv-uploader')
export class CsvUploaderController {
  constructor() {}

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
    const deleteFileAndRespond = () => {
      unlink(file.path, (err) => {
        if (err) {
          console.error('Error deleting the file:', err);
        }
        console.log(file.path + ' was deleted');
      });
    };

    try {
      if (!file) {
        throw new HttpException(`File must be send`, HttpStatus.BAD_REQUEST);
      }
      // Spawn a new child process to handle Uploader processing
      const csvUploader = fork(
        join(__dirname, './uploader-script/csv-uploader'),
        [file.path, language, tpaName, insuranceCompanyName],
      );
      csvUploader.on('message', (message) => {
        if (message === 'success') {
          // File processing completed successfully
          res.json({
            statusCode: 201,
            message: 'File Uploaded Successfully',
          });
          deleteFileAndRespond();
          csvUploader.kill()
        } 
      });

      csvUploader.on('error', (err) => {
        csvUploader.kill()
        deleteFileAndRespond();
        console.error('Child process error:', err);
        throw new HttpException(
          { reason: 'Error occurred during file upload' },
          HttpStatus.BAD_REQUEST,
        );
      });
    } catch (error) { 
      console.log(error);
      throw new HttpException(
        { reason: 'Error occurred during file upload' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
