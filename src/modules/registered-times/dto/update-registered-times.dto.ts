import { InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { EtimeTypes } from '../entities/registered-times.entity';

@InputType()
export class UpdateRegisteredTime {
  @IsOptional()
  @IsNotEmpty({ message: 'Not null Id_User' })
  user_id: number;

  @IsNotEmpty({ message: 'Not null DataTime' })
  time_registered: Date;

  @IsOptional()
  @IsNotEmpty({ message: 'Invalid Time Type' })
  @IsEnum(EtimeTypes)
  time_types?: EtimeTypes;
}
