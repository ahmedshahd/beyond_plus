import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { CreateLineOfBusinessInput } from './dto/create-line-of-business.input';
import { UpdateLineOfBusinessInput } from './dto/update-line-of-business.input';
import { LineOfBusinessService } from './line-of-business.service';

@Resolver('LineOfBusiness')
export class LineOfBusinessResolver {
  constructor(private readonly lineOfBusinessService: LineOfBusinessService) {}

  @Mutation('createLineOfBusiness')
  create(
    @Args('createLineOfBusinessInput')
    createLineOfBusinessInput: CreateLineOfBusinessInput,
  ) {
    return this.lineOfBusinessService.create(createLineOfBusinessInput);
  }

  @Query('lineOfBusiness')
  findAll(language: LanguageEnum) {
    return this.lineOfBusinessService.findAll(language);
  }

  @Mutation('updateLineOfBusiness')
  update(
    @Args('updateLineOfBusinessInput')
    updateLineOfBusinessInput: UpdateLineOfBusinessInput,
  ) {
    return this.lineOfBusinessService.update(updateLineOfBusinessInput);
  }

  @Mutation('removeLineOfBusiness')
  remove(@Args('id') id: number) {
    return this.lineOfBusinessService.remove(id);
  }
}
