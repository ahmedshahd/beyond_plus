import { Test, TestingModule } from '@nestjs/testing';
import { CityClientResolver } from './city.client.resolver';
import { CityClientService } from './city.client.service';

describe('CityClientResolver', () => {
  let resolver: CityClientResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityClientResolver, CityClientService],
    }).compile();

    resolver = module.get<CityClientResolver>(CityClientResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
