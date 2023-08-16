import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WellnessTipsService } from './wellness-tips.service';
import { CreateWellnessTipInput } from './dto/create-wellness-tip.input';
import { UpdateWellnessTipInput } from './dto/update-wellness-tip.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver('WellnessTip')
export class WellnessTipsResolver {
  constructor(private readonly wellnessTipsService: WellnessTipsService) {}

  @Mutation('createWellnessTip')
  create(
    @Args('createWellnessTipInput')
    createWellnessTipInput: CreateWellnessTipInput,
    @Args('attachment', { type: () => [GraphQLUpload] })
    attachment?: FileUpload[],
    // @Args('image', { type: () => GraphQLUpload })
    // image?: FileUpload,
  ) {
    // console.log('image from resolver', image);
    console.log('attachment from resolver', attachment);
    return this.wellnessTipsService.create(
      createWellnessTipInput,
      attachment,
      // image
    );
  }

  @Query('wellnessTips')
  findAll() {
    return this.wellnessTipsService.findAll();
  }

  @Query('wellnessTipsOfUser')
  findAllUserWellnessTips(
    @Args('userProfileUuid')
    userProfileUuid: string,
  ) {
    return this.wellnessTipsService.findAllUserWellnessTips(userProfileUuid);
  }

  @Query('wellnessTip')
  findOne(@Args('id') id: number) {
    return this.wellnessTipsService.findOne(id);
  }

  @Mutation('updateWellnessTip')
  update(
    @Args('updateWellnessTipInput')
    updateWellnessTipInput: UpdateWellnessTipInput,
    @Args('attachment', { type: () => [GraphQLUpload] })
    attachment?: FileUpload[],
  ) {
    return this.wellnessTipsService.update(
      updateWellnessTipInput.id,
      updateWellnessTipInput,
      attachment
    );
  }

  @Mutation('removeWellnessTip')
  remove(@Args('id') id: number) {
    return this.wellnessTipsService.remove(id);
  }
}
