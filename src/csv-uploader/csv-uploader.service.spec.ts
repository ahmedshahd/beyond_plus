import { Test, TestingModule } from '@nestjs/testing';
import { CsvUploaderService } from './csv-uploader.service';

describe('CsvUploaderService', () => {
  let service: CsvUploaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvUploaderService],
    }).compile();

    service = module.get<CsvUploaderService>(CsvUploaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
