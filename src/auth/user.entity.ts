import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";


//엔티티는 데이터베이스의 특정 테이블과 매핑되는 클래스로,
//주로 데이터 구조와 관련된 로직을 포함
@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;

    @Column()
    password: string;
}