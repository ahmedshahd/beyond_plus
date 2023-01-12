import { LanguageEnum } from '@prisma/client';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { InsuranceCompanyService } from './insurance-company.service';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
@Resolver('InsuranceCompany')
export class InsuranceCompanyResolver {
  constructor(
    private readonly insuranceCompanyService: InsuranceCompanyService,
  ) {}

  @Query('listAllTpas')
  async listAllTpas(
    @Args() args: PaginationAndSearchArgs,
    @Args('language') language: LanguageEnum,
  ) /*: [InsuranceCompany]*/ {
    return this.insuranceCompanyService.listAllTpas(
      language,
      args.search,
      args.page,
      args.limit,
    );
  }
  @Query('listAllInsuranceCompaniesByTpaId')
  async listAllInsuranceCompaniesByTpaId(
    @Args() args: PaginationAndSearchArgs,
    @Args('tpaId') tpaId: number,
    @Args('language') language: LanguageEnum,
  ) {
    return this.insuranceCompanyService.listAllInsuranceCompaniesByTpaId(
      tpaId,
      language,
      args.search,
      args.page,
      args.limit,
    );
  }
}
