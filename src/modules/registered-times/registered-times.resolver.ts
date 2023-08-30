import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { RegisteredTimesService } from './registered-times.service';
import { RegisteredTimes } from './entities/registered-times.entity';
import { CreateTimeRegisteredInput } from './dto/create-registered-times.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ERole, Users } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

const REGISTERED_TIMES = 'registeredTimeAdded';

@Resolver(() => RegisteredTimes)
export class RegisteredTimesResolver {
  constructor(
    private readonly registeredTimesService: RegisteredTimesService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.ADMIN)
  @Query(() => [RegisteredTimes])
  async registeredTimesAll(): Promise<RegisteredTimes[]> {
    return await this.registeredTimesService.findAllEmployeeRegisters();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.EMPLOYEE)
  @Query(() => [RegisteredTimes])
  async registeredTimesByUser(
    @CurrentUser() user: Users,
  ): Promise<RegisteredTimes[]> {
    return await this.registeredTimesService.findAllRegisterByUserId(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.EMPLOYEE)
  @Mutation(() => RegisteredTimes)
  async createRegister(
    @Args('data') data: CreateTimeRegisteredInput,
    @CurrentUser() user: Users,
  ): Promise<RegisteredTimes> {
    const registeredTime = await this.registeredTimesService.createRegister(
      user,
      data,
    );
    pubSub.publish(REGISTERED_TIMES, {
      registeredTimeAdded: registeredTime,
    });
    return registeredTime;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(ERole.ADMIN)
  @Subscription(() => RegisteredTimes, {
    name: REGISTERED_TIMES,
  })
  registeredTimesAdded() {
    return pubSub.asyncIterator(REGISTERED_TIMES);
  }
}
