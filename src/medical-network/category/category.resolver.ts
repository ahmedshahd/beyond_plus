import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { PaginationAndSearchArgs } from '../helpers/pagination-util.dto';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @Query('listAllCateoriesByInsuranceCompanyId')
  async listAllCateoriesByInsuranceCompanyId(
    @Args('language') language: LanguageEnum,
    @Args('insuranceCompanyId') insuranceCompanyId: number,
    @Args() args: PaginationAndSearchArgs,
  ) {
    return this.categoryService.listAllCateoriesByInsuranceCompanyId(
      language,
      insuranceCompanyId,
      args.search,
      args.page,
      args.limit,
    );
  }

  @Mutation('createCategory')
  create(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @Args('language') language: LanguageEnum,
  ) {
    return this.categoryService.create(createCategoryInput, language);
  }

  @Mutation('updateCategory')
  update(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(updateCategoryInput);
  }

  @Mutation('removeCategory')
  remove(@Args('id') id: number) {
    return this.categoryService.remove(id);
  }
}
