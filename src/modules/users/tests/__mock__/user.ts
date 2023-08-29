import { ERole, Users } from '../../entities/user.entity';
export default class UserMocks {
  static giveAMeAValidUser(): Users {
    const user = new Users();
    user.name = 'teste';
    user.email = 'teste@teste.com';
    user.id = 1;
    user.role = ERole.ADMIN;
    return user;
  }
}
