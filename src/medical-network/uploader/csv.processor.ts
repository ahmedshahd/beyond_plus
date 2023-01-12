import { Processor, Process } from '@nestjs/bull';
import { LanguageEnum } from '@prisma/client';
import { Job } from 'bull';
import { CSV_QUEUE } from '../constants/queue.data';
import { IDataCsv } from '../interfaces/data-csv.sheet.interface';
import { UploaderService } from './uploader.service';
import { unlinkSync } from 'fs';

@Processor(CSV_QUEUE)
export class CSVProcessor {
  constructor(private uploaderService: UploaderService) {}

  @Process('insertIntoDatabase')
  async processing(
    job: Job<{
      items: Array<IDataCsv>;
      language: LanguageEnum;
      insuranceCompanyName: string;
      tpaName: string;
      filePath: string;
    }>,
  ) {
    await this.uploaderService.bulkCreateSheet(
      job.data.items,
      job.data.language,
      job.data.insuranceCompanyName,
      job.data.tpaName,
    );

    unlinkSync(job.data.filePath); // delete file after inserting data into database
  }
}
