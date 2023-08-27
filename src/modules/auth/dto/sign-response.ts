import { Field, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/modules/users/entities/user.entity';

@ObjectType()
export class SignResponse {
  @Field()
  acessToken: string;

  @Field(() => Users)
  user: Users;
}
