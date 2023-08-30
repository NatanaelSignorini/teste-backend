import { InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ERole } from '../entities/user.entity';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Invalid characters' })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Invalid role' })
  @IsEnum(ERole)
  role?: ERole;
}
