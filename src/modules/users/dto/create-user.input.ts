import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'name not null' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email not null' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password not null' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'role not null' })
  role: string;
}
