import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validadeUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.getUserByEmail(data.email);
    const validatePassword = await compare(data.password, user.password);
    if (!validatePassword) {
      throw new UnauthorizedException('Incorrect User or Password');
    }
    const token = await this.jwtToken(user);
    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { username: user.name, sub: user.id, role: user.role };
    return this.jwtService.signAsync(payload);
  }
}
