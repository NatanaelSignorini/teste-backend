import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validadeUser(data: AuthInput): Promise<AuthType> {
    const user = this.userService.getUserByEmail(data.email);

    if (data.password !== (await user).password) {
      throw new UnauthorizedException('Incorrect Password');
    }
    return {
      user,
      token: 'token',
    };
  }
}
