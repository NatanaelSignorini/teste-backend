import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { ERole, Users } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Resolver('User')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.EMPLOYEE)
  @Query(() => [Users])
  async usersAll(): Promise<Users[]> {
    const users = await this.usersService.findAllUsers();
    return users;
  }

  @Query(() => Users)
  async userById(@Args('id') id: number): Promise<Users> {
    const user = this.usersService.getUserById(id);
    return user;
  }

  @Query(() => Users)
  async userByEmail(@Args('email') email: string): Promise<Users> {
    const user = this.usersService.getUserByEmail(email);
    return user;
  }

  @Mutation(() => Users)
  async createUser(@Args('data') data: CreateUserInput): Promise<Users> {
    const user = await this.usersService.createUser(data);
    return user;
  }

  @Mutation(() => Users)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserInput,
  ): Promise<Users> {
    const user = this.usersService.updateUser(id, data);
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<boolean> {
    const deleted = await this.usersService.deleteUser(id);
    return deleted;
  }
}
