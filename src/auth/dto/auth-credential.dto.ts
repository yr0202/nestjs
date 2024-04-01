import { IsString, Matches, MaxLength, MinLength } from "class-validator";

//엔티티(Entity)와 클라이언트(또는 다른 모듈) 사이에 데이터를 전달하는 데 사용

export class AuthCredentialsDto{
    //유효성 체크를 위해 "class-validator모듈을 이용"

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    // 영어랑 숫자만 가능한 유효성 체크
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password: string;
    
}