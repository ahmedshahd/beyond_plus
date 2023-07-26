import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { CreateWelcomeScreenInput } from './dto/create-welcome-screen.input';
import { UpdateWelcomeScreenInput } from './dto/update-welcome-screen.input';
import { WelcomeScreenAdminService } from './welcome-screen.admin.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver('Admin/WelcomeScreen')
export class WelcomeScreenAdminResolver {
  constructor(
    private readonly welcomeScreenAdminService: WelcomeScreenAdminService,
  ) {}

  
  @Mutation('createWelcomeScreen')
  create(
    @Args('createWelcomeScreenInput')
    createWelcomeScreenInput: CreateWelcomeScreenInput,
    @Args('language')
    language: LanguageEnum,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    image: FileUpload,
  ) {
    return this.welcomeScreenAdminService.create(
      createWelcomeScreenInput,
      language,
      image
    );
  }

  @Query('welcomeScreen')
  findAll(@Args('language') language: LanguageEnum) {
    return this.welcomeScreenAdminService.findAll(language);
  }

  @Mutation('updateWelcomeScreen')
  update(
    @Args('updateWelcomeScreenInput')
    updateWelcomeScreenInput: UpdateWelcomeScreenInput,
    @Args('image', { type: () => GraphQLUpload, nullable: true })
    image: FileUpload,
  ) {
    return this.welcomeScreenAdminService.update( updateWelcomeScreenInput, image);
  }

  @Mutation('removeWelcomeScreen')
  remove(@Args('id') id: number) {
    return this.welcomeScreenAdminService.remove(id);
  }
}
