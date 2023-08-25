import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: '' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: '' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '' })
  role: string;
}
