import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import * as bcrypt from 'bcrypt';

//리포지토리는 데이터베이스와의 상호 작용을 처리하는 클래스로,
//주로 CRUD(Create, Read, Update, Delete) 작업과 관련된 로직을 포함

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hashedPassword });

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing username');
                //예외를 발생시키는 클래스
                //이 클래스는 서버 상태 코드 409를 반환하고,
                //일반적으로 클라이언트 요청이 서버의 현재 상태와 충돌이 발생했음을 나타냄
                //일반적으로 데이터를 생성하거나 수정할 때 이미 존재하는 데이터와의 충돌이 발생할 때 사용
            } else {
                // 상태코드 500
                throw new InternalServerErrorException();
            }
            //console.log('error',error)
        }


    }
}