import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Myboard extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    loginID: string;

    @Column()
    password: string;

}