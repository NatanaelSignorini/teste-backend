import { encodePassword } from '../../../../utils/bcrypt';
import { ERole, Users } from '../../../users/entities/user.entity';
export default class UserMocks {
  static giveAMeAValidUser(): Users {
    const user = new Users();
    user.name = 'teste';
    user.email = 'teste@teste.com';
    user.password = encodePassword.to('1234');
    user.id = 1;
    user.role = ERole.ADMIN;
    return user;
  }
}
