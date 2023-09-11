import BaseModel from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends BaseModel {
  @Column({ length: 200, unique: true })
  email?: string;

  @Column({ length: 200, nullable: false })
  name?: string;

  @Column({ length: 200, nullable: true })
  photo?: string;

  @Column({ length: 200, nullable: true })
  secrete?: string;

  @Column({ length: 1000, nullable: true })
  password_temp?: string;

  @Column({ length: 1000, nullable: true })
  password_hash?: string;

  @Column({ type: 'boolean', default: true })
  enabled?: boolean;

  @Column({ type: 'boolean', default: false })
  verified?: boolean;
}
