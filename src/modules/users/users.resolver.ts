import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  async usersAll(): Promise<User[]> {
    const users = await this.usersService.findAllUsers();
    return users;
  }

  @Query(() => User)
  async userById(@Args('id') id: number): Promise<User> {
    const user = this.usersService.getUserById(id);
    return user;
  }

  @Query(() => User)
  async userByEmail(@Args('email') email: string): Promise<User> {
    const user = this.usersService.getUserByEmail(email);
    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.usersService.createUser(data);
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    const user = this.usersService.updateUser(id, data);
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<boolean> {
    const deleted = await this.usersService.deleteUser(id);
    return deleted;
  }
}
