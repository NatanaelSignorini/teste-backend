import { seeder } from 'nestjs-seeder';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../modules/users/entities/user.entity';
import { AdminSeeder } from './admin.seeder';
import { RegisteredTimes } from '../../modules/registered-times/entities/registered-times.entity';
import { typeOrmAsyncConfig } from '../../config/orm.config';

seeder({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TypeOrmModule.forFeature([Users, RegisteredTimes]),
  ],
}).run([AdminSeeder]);
