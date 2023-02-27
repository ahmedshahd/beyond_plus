import { Test, TestingModule } from '@nestjs/testing';
import { TpaService } from './tpa.service';

describe('TpaService', () => {
  let service: TpaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TpaService],
    }).compile();

    service = module.get<TpaService>(TpaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
