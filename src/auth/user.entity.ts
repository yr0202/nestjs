import { Board } from "src/boards/entities/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';


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

    @OneToMany(type => Board, board => board.user, { eager: true})
    // (보드의 타입을 정해줌, 보드 엔터티에서 유저 컬럼으로 접근가능하다, 유저정보를 가져올때 보드 정보도 가져온다)
    boards: Board[];

    async validatePassword(password: string): Promise<boolean> {
        let isValid = await bcrypt.compare(password, this.password);
        return isValid;
    }
}