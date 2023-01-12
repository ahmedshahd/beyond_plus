// import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { UserClientService } from './user.client.service';
// import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';

// import { LoginUserInput } from './dto/login.input';
// import { ResetPasswordUserInput } from './dto/reset-password.input';
// import { CurrentUser } from '../../helpers/user.decorator';

// @Resolver('User')
// export class UserClientResolver {
//   constructor(private readonly userClientService: UserClientService) {}

//   @Mutation('createUser')
//   create(@Args('createUserInput') createUserInput: CreateUserInput) {
//     return this.userClientService.create(createUserInput);
//   }

//   @Query('users')
//   findAll(@CurrentUser() user) {
//     console.log('user=', user);
//     return this.userClientService.findAll();
//   }


//   @Query('user')
//   findOne(@Args('id') id: number) {
//     return this.userClientService.findOne(id);
//   }

//   @Mutation('updateUser')
//   update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
//     return this.userClientService.update(updateUserInput.id, updateUserInput);
//   }

//   @Mutation('removeUser')
//   remove(@Args('id') id: number) {
//     return this.userClientService.remove(id);

//   @Query('logout')
//   logout(@CurrentUser() user) {
//     return this.userClientService.logout(user);
//   }
// }
