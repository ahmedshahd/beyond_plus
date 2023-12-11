import { Test, TestingModule } from '@nestjs/testing';
import { SendemailResolver } from './sendemail.resolver';
import { SendemailService } from './sendemail.service';

describe('SendemailResolver', () => {
  let resolver: SendemailResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendemailResolver, SendemailService],
    }).compile();

    resolver = module.get<SendemailResolver>(SendemailResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
