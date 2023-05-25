import { Test, TestingModule } from '@nestjs/testing';
import { UserInsuranceInfoResolver } from './user-insurance-info.resolver';
import { UserInsuranceInfoService } from './user-insurance-info.service';

describe('UserInsuranceInfoResolver', () => {
  let resolver: UserInsuranceInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInsuranceInfoResolver, UserInsuranceInfoService],
    }).compile();

    resolver = module.get<UserInsuranceInfoResolver>(UserInsuranceInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
