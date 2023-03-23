import { Test, TestingModule } from '@nestjs/testing';
import { AreaClientResolver } from './area.client.resolver';
import { AreaClientService } from './area.client.service';

describe('AreaClientResolver', () => {
  let resolver: AreaClientResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaClientResolver, AreaClientService],
    }).compile();

    resolver = module.get<AreaClientResolver>(AreaClientResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
