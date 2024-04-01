import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    PassportModule.register({
      defaultStrategy:'jwt'
    }),
    JwtModule.register({
      secret:'Secret1234', //토큰을 만들때 이용하는 secret텍스트(아무거나 입력)
      signOptions:{
        expiresIn:3600 // 정해진 시간 이후에는 토큰이 유효하지 않게 됨
      }
    }),
    TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService,UserRepository]
})
export class AuthModule {}
