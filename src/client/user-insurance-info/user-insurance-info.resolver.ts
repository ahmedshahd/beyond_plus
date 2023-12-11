import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UserInsuranceInfoService } from './user-insurance-info.service';
import { CreateUserInsuranceInfoInput } from './dto/create-user-insurance-info.input';
import { UpdateUserInsuranceInfoInput } from './dto/update-user-insurance-info.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { TpaService } from 'src/medical-network/tpa/tpa.service';
import { InsuranceCompanyService } from 'src/medical-network/insurance-company/insurance-company.service';

@Resolver('UserInsuranceInfo')
export class UserInsuranceInfoResolver {
  constructor(
    private readonly userInsuranceInfoService: UserInsuranceInfoService,
    private readonly tpaService: TpaService,
    private readonly insuranceCompanyService: InsuranceCompanyService,
  ) {}
  @Mutation('createUserInsuranceInfo')
  createUserInsuranceInfo(
    @Args('createUserInsuranceInfoInput')
    createUserInsuranceInfoInput: CreateUserInsuranceInfoInput,
    @Args('cardImage', { type: () => GraphQLUpload, nullable: true })
    cardImage: FileUpload,
  ) {
    return this.userInsuranceInfoService.create(
      createUserInsuranceInfoInput,
      cardImage,
    );
  }

  @Query('userInsuranceInfo')
  findOne(@Args('uuid') uuid: string) {
    return this.userInsuranceInfoService.findOne(uuid);
  }

  @ResolveField('insuranceCompanyName')
  async getInsuranceCompanyName(@Parent() userInsuranceInfo: any) {
    const insuranceCompanyId = userInsuranceInfo.insuranceCompanyId;
    if (insuranceCompanyId) {
      const insuranceCompany =
        await this.insuranceCompanyService.getInsuranceCompany(
          insuranceCompanyId,
        );
      const { name } = insuranceCompany;
      return name;
    }
    return '';
  }

  @ResolveField('tpaName')
  async getTpa(@Parent() userInsuranceInfo: any) {
    const tpaId = userInsuranceInfo.tpaId;
    if (tpaId) {
      const tpa = await this.tpaService.getTpa(tpaId);
      const { name } = tpa;
      return name;
    }
    return '';
  }

  @Mutation('updateUserInsuranceInfo')
  updateUserInsuranceInfo(
    @Args('updateUserInsuranceInfoInput')
    updateUserInsuranceInfoInput: UpdateUserInsuranceInfoInput,
    @Args('cardImage', { type: () => GraphQLUpload, nullable: true })
    cardImage: FileUpload,
  ) {
    console.log('cardImage from service', cardImage);
    return this.userInsuranceInfoService.update(
      updateUserInsuranceInfoInput.id,
      updateUserInsuranceInfoInput,
      cardImage,
    );
  }

  @Mutation('removeUserInsuranceInfo')
  removeUserInsuranceInfo(@Args('id') id: number) {
    return this.userInsuranceInfoService.remove(id);
  }
}
