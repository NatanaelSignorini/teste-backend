import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'varchar', length: 45 })
  @HideField()
  password: string;

  @Column({ type: 'varchar', length: 45 })
  role: string;

  // @OneToMany(() => RegisteredTime, (registeredtime) => registeredtime.user_id)
  // registeredtimes: RegisteredTime[];
}
