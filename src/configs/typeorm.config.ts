import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'sqldbfka9820@',
    database : 'inflearn-board-project',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize : true // 운영모드에서는 사용하지 말라?

}