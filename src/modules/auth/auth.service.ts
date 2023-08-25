import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthInput } from './dto/auth.input';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validadeUser(data: AuthInput) {
    //const user = this.userService.
  }
}
