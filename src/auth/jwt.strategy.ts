import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({ // 부모 클래스 사용하려고
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'), // 토큰이 유효한지
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //토큰이 어디에서 가져오는지
        });
    }

    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({
            where: {
                username
            }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

}