import {
  ObjectType,
  Field,
  ID,
  HideField,
  registerEnumType,
} from '@nestjs/graphql';
import { encodePassword } from 'src/utils/bcrypt';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ERole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
}

registerEnumType(ERole, {
  name: 'ERole',
});

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field(() => ID)
  id: number;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 72, transformer: encodePassword })
  @HideField()
  password: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  @Field(() => ERole)
  role: ERole;

  // @OneToMany(() => RegisteredTime, (registeredtime) => registeredtime.user_id)
  // registeredtimes: RegisteredTime[];
}
