import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisteredTimesService } from './registered-times.service';
import { RegisteredTimes } from './entities/registered-times.entity';
import { CreateTimeRegisteredInput } from './dto/create-registered-times.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ERole, Users } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
// import { UpdateRegisteredTimeInput } from './dto/update-registered-times.input';

@Resolver(() => RegisteredTimes)
export class RegisteredTimesResolver {
  constructor(
    private readonly registeredTimesService: RegisteredTimesService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.ADMIN)
  @Query(() => [RegisteredTimes])
  async registeredTimesAll(): Promise<RegisteredTimes[]> {
    return await this.registeredTimesService.findAllRegisters();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.EMPLOYEE)
  @Query(() => [RegisteredTimes])
  async registeredTimesByUser(
    @CurrentUser() user: Users,
  ): Promise<RegisteredTimes[]> {
    return await this.registeredTimesService.findAllRegisterByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ERole.EMPLOYEE)
  @Mutation(() => RegisteredTimes)
  async createRegister(
    @Args('data') data: CreateTimeRegisteredInput,
    @CurrentUser() user: Users,
  ): Promise<RegisteredTimes> {
    return this.registeredTimesService.createRegister(user.id, data);
  }
}
