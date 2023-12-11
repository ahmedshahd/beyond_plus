import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WellnessTipsService } from './wellness-tips.service';
import { CreateWellnessTipInput } from './dto/create-wellness-tip.input';
import { UpdateWellnessTipInput } from './dto/update-wellness-tip.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { CreateGlobalWellnessTipInput } from './dto/create-global-wellness-tip.input';
import { UserProfileService } from '../user-profile/user-profile.service';

@Resolver('WellnessTip')
export class WellnessTipsResolver {
  constructor(
    private readonly wellnessTipsService: WellnessTipsService,
    private readonly userProfileService: UserProfileService,
  ) {}

  @Mutation('createWellnessTip')
  create(
    @Args('createWellnessTipInput')
    createWellnessTipInput: CreateWellnessTipInput,
    @Args('attachments', { type: () => [GraphQLUpload] })
    attachments?: FileUpload[],
  ) {
    return this.wellnessTipsService.create(createWellnessTipInput, attachments);
  }

  @Mutation('createGlobalWellnessTip')
  createGlobal(
    @Args('createGlobalWellnessTipInput')
    createGlobalWellnessTipInput: CreateGlobalWellnessTipInput,
    @Args('attachments', { type: () => [GraphQLUpload] })
    attachments?: FileUpload[],
  ) {
    return this.wellnessTipsService.createGlobal(
      createGlobalWellnessTipInput,
      attachments,
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
    @Args('attachments', { type: () => [GraphQLUpload] })
    attachment?: FileUpload[],
  ) {
    return this.wellnessTipsService.update(
      updateWellnessTipInput.id,
      updateWellnessTipInput,
      attachment,
    );
  }

  @Mutation('removeWellnessTip')
  remove(@Args('id') id: number) {
    return this.wellnessTipsService.remove(id);
  }
}
