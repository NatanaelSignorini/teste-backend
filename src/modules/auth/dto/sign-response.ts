import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/entities/user.entity';

@ObjectType()
export class SignResponse {
  @Field()
  acessToken: string;

  @Field(() => User)
  user: User;
}
