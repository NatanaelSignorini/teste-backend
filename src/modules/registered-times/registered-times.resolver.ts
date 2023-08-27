import { Resolver } from '@nestjs/graphql';
import { RegisteredTimesService } from './registered-times.service';

@Resolver()
export class RegisteredTimesResolver {
  constructor(
    private readonly registeredTimesService: RegisteredTimesService,
  ) {}
}
