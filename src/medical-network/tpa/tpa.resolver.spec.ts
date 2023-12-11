import { Test, TestingModule } from '@nestjs/testing';
import { TpaResolver } from './tpa.resolver';
import { TpaService } from './tpa.service';

describe('TpaResolver', () => {
  let resolver: TpaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TpaResolver, TpaService],
    }).compile();

    resolver = module.get<TpaResolver>(TpaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
