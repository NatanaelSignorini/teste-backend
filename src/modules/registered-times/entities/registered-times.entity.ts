import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Users } from 'src/modules/users/entities/user.entity';
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
  @Field(() => ID)
  id: number;

  @Column({ type: 'int' })
  @ManyToOne(() => Users, (user) => user.id)
  user_id: number;

  @Column({ type: 'timestamptz' })
  time_registered: Date;

  @Column({ type: 'varchar', length: 45, nullable: false })
  @Field(() => EtimeTypes)
  time_types: EtimeTypes;
}
