import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as multer from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const configService = new ConfigService();

export const Multer = multer;

// Multer upload options
export const multerOptions: MulterOptions = {
  // Enable file size limits
  limits: {
    fileSize: +configService.get<string>('MULTER_MAX_FILE_SIZE') || +'1e+8',
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    // if (
    //   file.mimetype.startsWith(
    //     'application/vnd.openxmlformats-officedocument.spreadsheetml',
    //   ))
    if (file.mimetype.match(/\/(csv|xlsm)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      console.log('file', file);
      // Reject file
      console.log('mimetype', file.mimetype);

      return cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  // Storage properties
  storage: multer.diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = path.join(
        process.cwd(),
        `${configService.get<string>('MULTER_DESTINATION') || '/public/files'}`,
      );

      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      console.log("`${uuid()}${'.csv'}`", `${uuid()}${'.csv'}`);
      // Calling the callback passing the random name generated with the original extension name
      // cb(null, `${uuid()}${'.csv'}`);
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};
