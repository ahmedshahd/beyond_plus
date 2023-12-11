import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HealthCareService } from './health-care.service';
import { CreateHealthCareInput } from './dto/create-health-care.input';
import { UpdateHealthCareInput } from './dto/update-health-care.input';
import { CreateGlobalHealthCareInput } from './dto/create-global-health-care.input';

import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver('HealthCare')
export class HealthCareResolver {
  constructor(private readonly healthCareService: HealthCareService) {}

  @Mutation('createHealthCare')
  create(
    @Args('createHealthCareInput')
    createHealthCareInput: CreateHealthCareInput,
    @Args('attachments', { type: () => [GraphQLUpload] })
    attachments?: FileUpload[],
  ) {
    return this.healthCareService.create(
      createHealthCareInput,
      attachments,
      // image
    );
  }
  @Mutation('createGlobalHealthCare')
  createGlobal(
    @Args('createGlobalHealthCareInput')
    createGlobalHealthCareInput: CreateGlobalHealthCareInput,
    @Args('attachments', { type: () => [GraphQLUpload] })
    attachments?: FileUpload[],
  ) {
    return this.healthCareService.createGlobal(
      createGlobalHealthCareInput,
      attachments,
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
    @Args('attachments', { type: () => [GraphQLUpload] })
    attachments?: FileUpload[],
  ) {
    return this.healthCareService.update(
      updateHealthCareInput.id,
      updateHealthCareInput,
      attachments,
    );
  }

  @Mutation('removeHealthCare')
  remove(@Args('id') id: number) {
    return this.healthCareService.remove(id);
  }
}
