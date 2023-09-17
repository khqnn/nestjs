import { Field, ObjectType } from '@nestjs/graphql';
import BaseModel from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity('users')
export class User extends BaseModel {

  @Field()
  @Column({ length: 200, unique: true })
  email: string;

  @Field()
  @Column({ length: 200, nullable: false })
  name: string;

  @Field({nullable: true})
  @Column({ length: 200, nullable: true })
  photo?: string;

  @Field({nullable: true})
  @Column({ length: 200, nullable: true })
  secrete?: string;

  @Field({nullable: true})
  @Column({ length: 1000, nullable: true })
  password_temp?: string;

  @Field({nullable: true})
  @Column({ length: 1000, nullable: true })
  password_hash?: string;

  @Field({nullable: true})
  @Column({ type: 'boolean', default: true })
  enabled?: boolean;

  @Field({nullable: true})
  @Column({ type: 'boolean', default: false })
  verified?: boolean;
}
