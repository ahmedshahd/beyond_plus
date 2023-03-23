import { Test, TestingModule } from '@nestjs/testing';
import { CityClientService } from './city.client.service';

describe('CityClientService', () => {
  let service: CityClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityClientService],
    }).compile();

    service = module.get<CityClientService>(CityClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
