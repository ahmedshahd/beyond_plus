import { Test, TestingModule } from '@nestjs/testing';
import { CsvUploaderController } from './csv-uploader.controller';
import { CsvUploaderService } from './csv-uploader.service';

describe('CsvUploaderController', () => {
  let controller: CsvUploaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsvUploaderController],
      providers: [CsvUploaderService],
    }).compile();

    controller = module.get<CsvUploaderController>(CsvUploaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
