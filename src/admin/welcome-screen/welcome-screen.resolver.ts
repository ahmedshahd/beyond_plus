import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageEnum } from '@prisma/client';
import { CreateWelcomeScreenInput } from './dto/create-welcome-screen.input';
import { UpdateWelcomeScreenInput } from './dto/update-welcome-screen.input';
import { WelcomeScreenService } from './welcome-screen.service';

@Resolver('WelcomeScreen')
export class WelcomeScreenResolver {
  constructor(private readonly welcomeScreenService: WelcomeScreenService) {}

  @Mutation('createWelcomeScreen')
  create(
    @Args('createWelcomeScreenInput')
    createWelcomeScreenInput: CreateWelcomeScreenInput,
  ) {
    return this.welcomeScreenService.create(createWelcomeScreenInput);
  }

  @Query('welcomeScreen')
  findAll(language: LanguageEnum) {
    return this.welcomeScreenService.findAll(language);
  }

  @Mutation('updateWelcomeScreen')
  update(
    @Args('updateWelcomeScreenInput')
    updateWelcomeScreenInput: UpdateWelcomeScreenInput,
  ) {
    return this.welcomeScreenService.update(updateWelcomeScreenInput);
  }

  @Mutation('removeWelcomeScreen')
  remove(@Args('id') id: number) {
    return this.welcomeScreenService.remove(id);
  }
}
