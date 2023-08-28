import { DataSource, Repository } from 'typeorm';
import { RegisteredTimes } from '../entities/registered-times.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisteredTimesRepository extends Repository<RegisteredTimes> {
  constructor(dataSource: DataSource) {
    super(RegisteredTimes, dataSource.createEntityManager());
  }
  async getLatestRegisteredTimeByUserId(userId: number) {
    return this.createQueryBuilder()
      .where({ user: { id: userId } })
      .orderBy('time_registered', 'DESC')
      .getOne();
  }
}
