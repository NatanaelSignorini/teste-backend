import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.usersService.findAllUsers();
    return users;
  }

  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    const user = this.usersService.findUserById(id);
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
