import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { CreateLineOfBusinessInput } from './dto/create-line-of-business.input';
import { UpdateLineOfBusinessInput } from './dto/update-line-of-business.input';
import { LineOfBusinessAdminService } from './line-of-business.admin.service';

@Resolver('Admin/LineOfBusiness')
export class LineOfBusinessAdminResolver {
  constructor(
    private readonly lineOfBusinessAdminService: LineOfBusinessAdminService,
  ) {}

  @Mutation('createLineOfBusiness')
  create(
    @Args('createLineOfBusinessInput')
    createLineOfBusinessInput: CreateLineOfBusinessInput,
    @Args('language')
    language: LanguageEnum,
  ) {
    return this.lineOfBusinessAdminService.create(
      createLineOfBusinessInput,
      language,
    );
  }

  @Query('lineOfBusiness')
  findAll(@Args('language') language: LanguageEnum) {
    return this.lineOfBusinessAdminService.findAll(language);
  }

  @Mutation('updateLineOfBusiness')
  update(
    @Args('updateLineOfBusinessInput')
    updateLineOfBusinessInput: UpdateLineOfBusinessInput,
  ) {
    return this.lineOfBusinessAdminService.update(updateLineOfBusinessInput);
  }

  @Mutation('removeLineOfBusiness')
  remove(@Args('id') id: number) {
    return this.lineOfBusinessAdminService.remove(id);
  }
}
