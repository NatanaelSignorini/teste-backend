import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisteredTimesService } from './registered-times.service';
import { RegisteredTimes } from './entities/registered-times.entity';
import { CreateTimeRegisteredInput } from './dto/create-registered-times.input';
import { UpdateRegisteredTimeInput } from './dto/update-registered-times.input';

@Resolver(() => RegisteredTimes)
export class RegisteredTimesResolver {
  constructor(
    private readonly registeredTimesService: RegisteredTimesService,
  ) {}

  @Query(() => RegisteredTimes)
  async registeredTimesById(@Args('id') id: number): Promise<RegisteredTimes> {
    return this.registeredTimesService.findRegisterById(id);
  }
  @Query(() => [RegisteredTimes])
  async registeredTimesAll(): Promise<RegisteredTimes[]> {
    return await this.registeredTimesService.findAllRegisters();
  }

  @Mutation(() => RegisteredTimes)
  async createRegister(
    @Args('data') data: CreateTimeRegisteredInput,
  ): Promise<RegisteredTimes> {
    return this.registeredTimesService.createRegister(data);
  }

  @Mutation(() => RegisteredTimes)
  async updateRegister(
    @Args('id') id: number,
    @Args('data') data: UpdateRegisteredTimeInput,
  ): Promise<RegisteredTimes> {
    return this.registeredTimesService.updateRegister(id, data);
  }

  @Mutation(() => Boolean)
  async deleteRegister(@Args('id') id: number): Promise<true> {
    await this.registeredTimesService.removeRegister(id);
    return true;
  }
}
