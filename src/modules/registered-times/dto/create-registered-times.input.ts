import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { EtimeTypes } from '../entities/registered-times.entity';

@InputType()
export class CreateTimeRegisteredInput {
  @IsNotEmpty({ message: 'Not null Id_User' })
  @Field()
  user_id: number;

  @IsNotEmpty({ message: 'Not null DataTime' })
  @Field()
  time_registered: Date;

  @IsNotEmpty({ message: 'Not null Time Types' })
  @Field(() => EtimeTypes)
  time_types: EtimeTypes;
}
