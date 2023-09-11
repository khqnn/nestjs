import BaseModel from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";


@Entity('users')
export class User extends BaseModel{

    @Column({length: 200, nullable: true})
    name?: string
}