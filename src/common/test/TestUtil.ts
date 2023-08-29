import { ERole, Users } from '../../modules/users/entities/user.entity';
export default class TestUtil {
  static giveAMeAValidUser(): Users {
    const user = new Users();
    user.email = 'teste';
    user.name = 'teste@teste.com';
    user.id = 1;
    user.role = ERole.ADMIN;
    return user;
  }
}
