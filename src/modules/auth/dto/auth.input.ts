import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class AuthInput {
  @Field()
  @IsString()
  email: string;

  @Field()
  @IsString()
  password: string;
}
