import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { CreateWelcomeScreenInput } from './dto/create-welcome-screen.input';
import { UpdateWelcomeScreenInput } from './dto/update-welcome-screen.input';
import { WelcomeScreenAdminService } from './welcome-screen.admin.service';

@Resolver('Admin/WelcomeScreen')
export class WelcomeScreenAdminResolver {
  constructor(
    private readonly welcomeScreenAdminService: WelcomeScreenAdminService,
  ) {}

  @Mutation('createWelcomeScreen')
  create(
    @Args('createWelcomeScreenInput')
    createWelcomeScreenInput: CreateWelcomeScreenInput,
  ) {
    return this.welcomeScreenAdminService.create(createWelcomeScreenInput);
  }

  @Query('welcomeScreen')
  findAll(language: LanguageEnum) {
    return this.welcomeScreenAdminService.findAll(language);
  }

  @Mutation('updateWelcomeScreen')
  update(
    @Args('updateWelcomeScreenInput')
    updateWelcomeScreenInput: UpdateWelcomeScreenInput,
  ) {
    return this.welcomeScreenAdminService.update(updateWelcomeScreenInput);
  }

  @Mutation('removeWelcomeScreen')
  remove(@Args('id') id: number) {
    return this.welcomeScreenAdminService.remove(id);
  }
}
