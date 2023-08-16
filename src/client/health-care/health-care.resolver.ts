import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HealthCareService } from './health-care.service';
import { CreateHealthCareInput } from './dto/create-health-care.input';
import { UpdateHealthCareInput } from './dto/update-health-care.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver('HealthCare')
export class HealthCareResolver {
  constructor(private readonly healthCareService: HealthCareService) {}

  @Mutation('createHealthCare')
  create(
    @Args('createHealthCareInput')
    createHealthCareInput: CreateHealthCareInput,
    @Args('attachment', { type: () => [GraphQLUpload] })
    attachment?: FileUpload[],
    // @Args('image', { type: () => GraphQLUpload })
    // image?: FileUpload,
  ) {
    // console.log('image from resolver', image);
    console.log('attachment from resolver', attachment);
    return this.healthCareService.create(
      createHealthCareInput,
      attachment,
      // image
    );
  }

  @Query('healthCares')
  findAll() {
    return this.healthCareService.findAll();
  }

  @Query('healthCareOfUser')
  findAllUserHealthCare(
    @Args('userProfileUuid')
    userProfileUuid: string,
  ) {
    return this.healthCareService.findAllUserHealthCare(userProfileUuid);
  }

  @Query('healthCare')
  findOne(@Args('id') id: number) {
    return this.healthCareService.findOne(id);
  }

  @Mutation('updateHealthCare')
  update(
    @Args('updateHealthCareInput')
    updateHealthCareInput: UpdateHealthCareInput,
    @Args('attachment', { type: () => [GraphQLUpload] })
    attachment?: FileUpload[],
  ) {
    return this.healthCareService.update(
      updateHealthCareInput.id,
      updateHealthCareInput,
      attachment
    );
  }

  @Mutation('removeHealthCare')
  remove(@Args('id') id: number) {
    return this.healthCareService.remove(id);
  }
}
