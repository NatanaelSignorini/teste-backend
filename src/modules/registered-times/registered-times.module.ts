import { Module } from '@nestjs/common';
import { RegisteredTimesService } from './registered-times.service';
import { RegisteredTimesResolver } from './registered-times.resolver';

@Module({
  providers: [RegisteredTimesResolver, RegisteredTimesService],
})
export class RegisteredTimesModule {}
