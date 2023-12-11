import { Module } from '@nestjs/common';
import { CsvUploaderService } from './csv-uploader.service';
import { CsvUploaderController } from './csv-uploader.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CsvUploaderController],
  providers: [CsvUploaderService, PrismaService],
})
export class CsvUploaderModule {}
