import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class JtwStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiriration: false,
      secretOrkey: process.env.JWT_SECRET,
    });
  }

  async validade(payload: { sub: User['id']; name: string }) {
    const user = this.userService.getUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
