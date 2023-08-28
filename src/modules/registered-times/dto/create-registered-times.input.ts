import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTimeRegisteredInput {
  @IsNotEmpty({ message: 'Not null DataTime' })
  @Field()
  time_registered: Date;
}
