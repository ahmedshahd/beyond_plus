import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import {
  Public,
  Resource,
  RoleMatchingMode,
  Roles,
  Scopes,
  Unprotected,
} from 'nest-keycloak-connect';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../helpers/user.decorator';
import { GraphQlKeycloakAuthGuard } from '../keycloak/guard/graphql-auth-guard';
import { LoginUserInput } from './dto/login.input';

@Resource('beyond-plus-resource')
@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Roles({ roles: ['admin_role'], mode: RoleMatchingMode.ANY })
  @Scopes('view')
  //@UseGuards(GraphQlKeycloakAuthGuard)
  @Query('users')
  findAll(@CurrentUser() user: any) {
    console.log('user=', user);
    return this.userService.findAll();
  }

  @Public()
  @Mutation('register')
  register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.register(createUserInput);
  }

  @Query('user')
  findOne(@Args('id') id: number) {
    return this.userService.findOne(id);
  }

  @Public()
  @Query('login')
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.userService.login(loginUserInput);
  }

  @Public()
  @Query('accessTokenFromRefreshToken')
  userAccessTokenFromRefreshToken(@Args('refreshToken') refreshToken: string) {
    return this.userService.userAccessTokenFromRefreshToken(refreshToken);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
