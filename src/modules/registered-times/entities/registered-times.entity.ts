import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Users } from '../../../modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum EtimeTypes {
  In = 'in',
  Out = 'out',
}

registerEnumType(EtimeTypes, {
  name: 'EtimeTypes',
});

@ObjectType()
@Entity()
export class RegisteredTimes {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field(() => ID, { nullable: true })
  id: number;

  @ManyToOne(() => Users, (user) => user.registeredtimes, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field({ nullable: true })
  user: Users;

  @Column({ type: 'timestamptz' })
  @Field({ nullable: true })
  time_registered: Date;

  @Column({ type: 'varchar', length: 45, nullable: false })
  @Field(() => EtimeTypes, { nullable: true })
  time_types: EtimeTypes;
}
