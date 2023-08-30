import { ERole, Users } from '../../../../modules/users/entities/user.entity';
import {
  EtimeTypes,
  RegisteredTimes,
} from '../../entities/registered-times.entity';
import { faker } from '@faker-js/faker';

export default class RegisteredTimesMocks {
  static giveAMeAValidRegisteredTime(user?: Users): RegisteredTimes {
    const registeredTimes = new RegisteredTimes();
    registeredTimes.id = faker.number.int();
    registeredTimes.time_registered = faker.date.recent();
    registeredTimes.time_types = EtimeTypes.In;
    registeredTimes.user = user || this.giveAMeAValidEmployee();
    return registeredTimes;
  }

  static giveAMeAValidRegisteredTimeGreaterThan(
    refDate: Date,
    user?: Users,
  ): RegisteredTimes {
    const registeredTimes = new RegisteredTimes();
    registeredTimes.id = faker.number.int();
    registeredTimes.time_registered = faker.date.soon({ refDate });
    registeredTimes.time_types = EtimeTypes.In;
    registeredTimes.user = user || this.giveAMeAValidEmployee();
    return registeredTimes;
  }

  static giveAMeAValidRegisteredTimeLessThan(
    refDate: Date,
    user?: Users,
  ): RegisteredTimes {
    const registeredTimes = new RegisteredTimes();
    registeredTimes.id = faker.number.int();
    registeredTimes.time_registered = faker.date.recent({ refDate });
    registeredTimes.time_types = EtimeTypes.In;
    registeredTimes.user = user || this.giveAMeAValidEmployee();
    return registeredTimes;
  }

  static giveAMeAValidEmployee(): Users {
    const user = new Users();
    user.name = faker.person.fullName();
    user.email = faker.internet.email();
    user.id = faker.number.int();
    user.role = ERole.EMPLOYEE;
    return user;
  }

  static giveAnArrayOfEmployeesRegisteredTimes(): RegisteredTimes[] {
    const registeredTimes = [];
    for (let index = 0; index < 10; index++) {
      registeredTimes.push(this.giveAMeAValidRegisteredTime());
    }
    return registeredTimes;
  }

  static giveAnArrayOfEmployeeRegisteredTimes(): RegisteredTimes[] {
    const registeredTimes = [];
    const user = this.giveAMeAValidEmployee();
    for (let index = 0; index < 10; index++) {
      registeredTimes.push(this.giveAMeAValidRegisteredTime(user));
    }
    return registeredTimes;
  }
}
