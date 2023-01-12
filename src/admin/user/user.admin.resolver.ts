import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserAdminService } from './user.admin.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUser } from '../../helpers/user.decorator';

@Resolver('Admin/User')
export class UserAdminResolver {
  constructor(private readonly userAdminService: UserAdminService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userAdminService.create(createUserInput);
  }

  @Query('users')
  findAll() {
    return this.userAdminService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: number) {
    return this.userAdminService.findOne(id);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userAdminService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.userAdminService.remove(id);
  }
}
