import { LanguageEnum } from '@prisma/client';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InsuranceCompanyService } from './insurance-company.service';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { CreateInsuranceCompanyInput } from './dto/create-insurance-company.input';
import { UpdateInsuranceCompanyInput } from './dto/update-insurance-company.input';
@Resolver('InsuranceCompany')
export class InsuranceCompanyResolver {
  constructor(
    private readonly insuranceCompanyService: InsuranceCompanyService,
  ) {}

  @Query('getInsuranceCompany')
  async getInsuranceCompanyId(@Args('id') id: number) {
    return this.insuranceCompanyService.getInsuranceCompany(id);
  }

  @Query('listAllInsuranceCompaniesByTpaId')
  async listAllInsuranceCompaniesByTpaId(
    @Args() args: PaginationAndSearchArgs,
    @Args('tpaId') tpaId: number,
  ) {
    return this.insuranceCompanyService.listAllInsuranceCompaniesByTpaId(
      tpaId,
      args.search,
      args.page,
      args.limit,
    );
  }

  @Mutation('createInsuranceCompany')
  create(
    @Args('createInsuranceCompanyInput')
    createInsuranceCompanyInput: CreateInsuranceCompanyInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.insuranceCompanyService.create(
      createInsuranceCompanyInput,
      language,
    );
  }

  @Mutation('updateInsuranceCompany')
  update(
    @Args('updateInsuranceCompanyInput')
    updateInsuranceCompanyInput: UpdateInsuranceCompanyInput,
  ) {
    return this.insuranceCompanyService.update(updateInsuranceCompanyInput);
  }

  @Mutation('removeInsuranceCompany')
  remove(@Args('id') id: number) {
    return this.insuranceCompanyService.remove(id);
  }
}
