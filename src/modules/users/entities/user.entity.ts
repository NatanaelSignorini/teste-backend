import {
  ObjectType,
  Field,
  ID,
  HideField,
  registerEnumType,
} from '@nestjs/graphql';
import { RegisteredTimes } from '../../../modules/registered-times/entities/registered-times.entity';
import { encodePassword } from '../../../utils/bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ERole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
}

registerEnumType(ERole, {
  name: 'ERole',
});

@ObjectType()
@Entity()
export class Users {
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

  @OneToMany(() => RegisteredTimes, (registeredTime) => registeredTime.user, {
    cascade: true,
  })
  registeredtimes: RegisteredTimes[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
