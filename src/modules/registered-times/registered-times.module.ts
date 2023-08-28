import { Module } from '@nestjs/common';
import { RegisteredTimesService } from './registered-times.service';
import { RegisteredTimesResolver } from './registered-times.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisteredTimes } from './entities/registered-times.entity';
import { RegisteredTimesRepository } from './repositories/registered-times.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RegisteredTimes])],
  providers: [
    RegisteredTimesResolver,
    RegisteredTimesService,
    RegisteredTimesRepository,
  ],
})
export class RegisteredTimesModule {}
