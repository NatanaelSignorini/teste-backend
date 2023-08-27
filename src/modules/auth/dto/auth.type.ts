import { Field, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/modules/users/entities/user.entity';

@ObjectType()
export class AuthType {
  @Field(() => Users)
  user: Users;

  @Field()
  token: string;
}
