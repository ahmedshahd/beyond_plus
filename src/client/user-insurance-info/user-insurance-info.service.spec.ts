import { Test, TestingModule } from '@nestjs/testing';
import { UserInsuranceInfoService } from './user-insurance-info.service';

describe('UserInsuranceInfoService', () => {
  let service: UserInsuranceInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInsuranceInfoService],
    }).compile();

    service = module.get<UserInsuranceInfoService>(UserInsuranceInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
