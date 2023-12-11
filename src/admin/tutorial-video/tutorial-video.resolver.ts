import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TutorialVideoService } from './tutorial-video.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { CreateTutorialVideoInput } from './dto/create-tutorial-video';
import { UpdateTutorialVideoInput } from './dto/update-tutorial-video';
import { LanguageEnum } from '@prisma/client';

@Resolver()
export class TutorialVideoResolver {
  constructor(private readonly tutorialVideoService: TutorialVideoService) {


  }


  @Mutation('createTutorialVideo')
  create(
    @Args('createTutorialVideoInput')
    createTutorialVideoInput: CreateTutorialVideoInput,
    @Args('video', { type: () => GraphQLUpload, nullable: true })
    video: FileUpload,
    @Args('language')
    language: LanguageEnum
  ) {
    return this.tutorialVideoService.create(
      createTutorialVideoInput,
      video,
      language
    );
  }

  @Query('tutorialVideo')
  findAll(
    @Args('search') search: string,
    @Args('language')
    language: LanguageEnum
  ) {
    return this.tutorialVideoService.findAll(language,search);
  }

  @Mutation('updateTutorialVideo')
  update(
    @Args('updateTutorialVideoInput')
    updateTutorialVideoInput: UpdateTutorialVideoInput,
    @Args('video', { type: () => GraphQLUpload, nullable: true })
    video: FileUpload,
    @Args('language')
    language: LanguageEnum
  ) {
    return this.tutorialVideoService.update(
      updateTutorialVideoInput,
      language,
      video,
    );
  }

  @Mutation('removeTutorialVideo')
  remove(@Args('id') id: number) {
    return this.tutorialVideoService.remove(id);
  }
}
