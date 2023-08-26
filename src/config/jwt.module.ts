import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'teste',
        signOptions: {
          expiresIn: '30s',
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ModuleJwt {}
