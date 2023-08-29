import {
  EtimeTypes,
  RegisteredTimes,
} from '../../entities/registered-times.entity';

export default class RegisteredTimesMocks {
  static giveAMeAValidRegisteredTimes(): RegisteredTimes {
    const registeredTimes = new RegisteredTimes();
    registeredTimes.id = 1;
    registeredTimes.time_registered = new Date('2023-08-30T23:39:54.3455Z');
    registeredTimes.time_types = EtimeTypes.In;
    registeredTimes.user;

    return registeredTimes;
  }
}
