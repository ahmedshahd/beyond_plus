import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { UploaderController } from './uploader.controller';
import { UploaderService } from './uploader.service';
import * as path from 'path';
import { CSVProcessor } from './csv.processor';
import { BullModule } from '@nestjs/bull';
import { CSV_QUEUE } from '../constants/queue.data';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: CSV_QUEUE,
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        //dest:path.join(__dirname, '../../src/uploader/images/' ) //configService.get<string>('MULTER_DEST'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UploaderController],
  providers: [UploaderService, PrismaService, CSVProcessor],
})
export class UploaderModule {}
