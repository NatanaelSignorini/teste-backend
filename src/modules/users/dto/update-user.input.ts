import { InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ERole } from '../entities/user.entity';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Invalid characters' })
  name?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty({ message: 'Invalid E-mail' })
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Invalid password' })
  password?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Invalid role' })
  @IsEnum(ERole)
  role?: ERole;
}
