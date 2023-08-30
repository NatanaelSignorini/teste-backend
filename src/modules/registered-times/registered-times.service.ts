import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  EtimeTypes,
  RegisteredTimes,
} from './entities/registered-times.entity';

import { CreateTimeRegisteredInput } from './dto/create-registered-times.input';
import { RegisteredTimesRepository } from './repositories/registered-times.repository';
import { ERole, Users } from '../users/entities/user.entity';

@Injectable()
export class RegisteredTimesService {
  constructor(private registeredTimes: RegisteredTimesRepository) {}

  async createRegister(
    user: Users,
    { time_registered }: CreateTimeRegisteredInput,
  ): Promise<RegisteredTimes> {
    const lastRegisteredTime =
      await this.registeredTimes.getLatestRegisteredTimeByUserId(user.id);
    if (
      lastRegisteredTime?.time_registered?.getTime() >=
      time_registered?.getTime()
    ) {
      throw new BadRequestException('Date needs to be greater than previous');
    }

    const type =
      lastRegisteredTime?.time_types == EtimeTypes.In
        ? EtimeTypes.Out
        : EtimeTypes.In;

    const registeredTime = await this.registeredTimes.save({
      user,
      time_types: type,
      time_registered,
    });

    if (!registeredTime) {
      throw new InternalServerErrorException('Failed to create record');
    }

    return this.registeredTimes.findOne({
      where: { id: registeredTime.id },
      relations: { user: true },
    });
  }

  async findAllEmployeeRegisters(): Promise<RegisteredTimes[]> {
    const registeredTimes = await this.registeredTimes.find({
      where: {
        user: { role: ERole.EMPLOYEE },
      },
      relations: { user: true },
    });
    return registeredTimes;
  }

  async findAllRegisterByUserId(user: Users): Promise<RegisteredTimes[]> {
    const registeredTimes = await this.registeredTimes.find({
      where: { user: { id: user.id } },
      relations: { user: true },
    });

    return registeredTimes;
  }
}
