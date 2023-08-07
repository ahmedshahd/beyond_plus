import { Module } from '@nestjs/common';
import { CsvUploaderController } from './csv-uploader.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CsvUploaderController],
  providers: [ PrismaService],
})
export class CsvUploaderModule {}
