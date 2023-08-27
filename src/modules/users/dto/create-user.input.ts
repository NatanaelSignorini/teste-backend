import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ERole } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'name not null' })
  @Field()
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email not null' })
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password not null' })
  @Field()
  password: string;

  @IsNotEmpty({ message: 'role not null' })
  @Field(() => ERole)
  role: ERole;
}
