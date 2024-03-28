import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from "src/boards/board.entity";

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'sqldbfka9820@',
    database : 'board_project',
    autoLoadEntities: true,
    entities: [Board],
    synchronize : true // 운영모드에서는 사용하지 말라?

}