import { Test, TestingModule } from '@nestjs/testing';
import { AreaClientService } from './area.client.service';

describe('AreaClientService', () => {
  let service: AreaClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaClientService],
    }).compile();

    service = module.get<AreaClientService>(AreaClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
