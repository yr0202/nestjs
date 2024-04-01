import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({
            where: {
                username
            }
        });
        const passwordCheck = await bcrypt.compare(password, user.password);

        if (user && passwordCheck) {
            // 유저 토큰 생성 { Secret + payload}가 필요함
            const payload = { username }; //누구나 볼 수 있기 때문에 중요한 정보는 적으면 안됨
            const accessToken = this.jwtService.sign(payload); //sign()메서드가 Secret과 payload를 알아서 합쳐서 토큰 생성해줌

            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed')
        }


    }
}
