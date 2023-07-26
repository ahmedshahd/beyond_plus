import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TutorialVideoService } from './tutorial-video.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { CreateTutorialVideoInput } from './dto/create-tutorial-video';
import { UpdateTutorialVideoInput } from './dto/update-tutorial-video';

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
  ) {
    return this.tutorialVideoService.create(
      createTutorialVideoInput,
      video,
    );
  }

  @Query('tutorialVideo')
  findAll(
    @Args('search') search: string,
  ) {
    return this.tutorialVideoService.findAll(search);
  }

  @Mutation('updateTutorialVideo')
  update(
    @Args('updateTutorialVideoInput')
    updateTutorialVideoInput: UpdateTutorialVideoInput,
    @Args('video', { type: () => GraphQLUpload, nullable: true })
    video: FileUpload,
  ) {
    return this.tutorialVideoService.update(
      updateTutorialVideoInput,
      video,
    );
  }

  @Mutation('removeTutorialVideo')
  remove(@Args('id') id: number) {
    return this.tutorialVideoService.remove(id);
  }
}
