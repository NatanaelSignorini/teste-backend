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

@Injectable()
export class RegisteredTimesService {
  constructor(private registeredTimes: RegisteredTimesRepository) {}

  async createRegister(
    userId: number,
    { time_registered }: CreateTimeRegisteredInput,
  ): Promise<RegisteredTimes> {
    const lastRegisteredTime =
      await this.registeredTimes.getLatestRegisteredTimeByUserId(userId);

    if (
      lastRegisteredTime.time_registered.getTime() >= time_registered.getTime()
    ) {
      throw new BadRequestException('Data precisa ser maior que anterior');
    }

    const type =
      lastRegisteredTime?.time_types == EtimeTypes.In
        ? EtimeTypes.Out
        : EtimeTypes.In;

    const registeredTime = await this.registeredTimes.save({
      user_id: userId,
      time_types: type,
      time_registered,
    });

    if (!registeredTime) {
      throw new InternalServerErrorException('Falha ao criar registro');
    }

    return registeredTime;
  }

  async findAllRegisters(): Promise<RegisteredTimes[]> {
    const registeredTimes = await this.registeredTimes.find();
    return registeredTimes;
  }

  async findAllRegisterByUserId(userId: number): Promise<RegisteredTimes[]> {
    const registeredTimes = await this.registeredTimes.find({
      where: {
        user_id: userId,
      },
    });

    return registeredTimes;
  }
}
