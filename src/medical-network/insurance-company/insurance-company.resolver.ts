import { LanguageEnum } from '@prisma/client';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InsuranceCompanyService } from './insurance-company.service';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { CreateTpaInput } from './dto/tpa/create-tpa.input';
import { UpdateTpaInput } from './dto/tpa/update-tpa.input';
import { CreateInsuranceCompanyInput } from './dto/insurance-company/create-insurance-company.input';
import { UpdateInsuranceCompanyInput } from './dto/insurance-company/update-insurance-company.input';
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

  @Mutation('createInsuranceCompany')
  createInsuranceCompany(
    @Args('createInsuranceCompanyInput')
    createInsuranceCompanyInput: CreateInsuranceCompanyInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.insuranceCompanyService.createInsuranceCompany(
      createInsuranceCompanyInput,
      language,
    );
  }

  @Mutation('updateInsuranceCompany')
  updateInsuranceCompany(
    @Args('updateInsuranceCompanyInput')
    updateInsuranceCompanyInput: UpdateInsuranceCompanyInput,
  ) {
    return this.insuranceCompanyService.updateInsuranceCompany(
      updateInsuranceCompanyInput,
    );
  }

  @Mutation('removeInsuranceCompany')
  removeInsuranceCompany(@Args('id') id: number) {
    return this.insuranceCompanyService.removeInsuranceCompany(id);
  }

  // @Mutation('createTpa')
  // createTpa(
  //   @Args('createTpaInput') createTpaInput: CreateTpaInput,
  //   @Args('language') language: LanguageEnum,
  // ) {
  //   return this.insuranceCompanyService.createTpa(createTpaInput, language);
  // }

  // @Mutation('updateTpa')
  // updateTpa(@Args('updateTpaInput') updateTpaInput: UpdateTpaInput) {
  //   return this.insuranceCompanyService.updateTpa(updateTpaInput);
  // }

  // @Mutation('removeTpa')
  // removeTpa(@Args('id') id: number) {
  //   return this.insuranceCompanyService.removeTpa(id);
  // }
}
