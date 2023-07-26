import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { CreateLineOfBusinessInput } from './dto/create-line-of-business.input';
import { UpdateLineOfBusinessInput } from './dto/update-line-of-business.input';
import { LineOfBusinessAdminService } from './line-of-business.admin.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

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
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    image: FileUpload,
  ) {
    return this.lineOfBusinessAdminService.create(
      createLineOfBusinessInput,
      language,
      image,
    );
  }

  @Query('lineOfBusiness')
  findAll(
    @Args('language') language: LanguageEnum,
    @Args('search') search: string,
  ) {
    return this.lineOfBusinessAdminService.findAll(language, search);
  }

  @Mutation('updateLineOfBusiness')
  update(
    @Args('updateLineOfBusinessInput')
    updateLineOfBusinessInput: UpdateLineOfBusinessInput,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    image: FileUpload,
  ) {
    return this.lineOfBusinessAdminService.update(
      updateLineOfBusinessInput,
      image,
    );
  }

  @Mutation('removeLineOfBusiness')
  remove(@Args('id') id: number) {
    return this.lineOfBusinessAdminService.remove(id);
  }
}
