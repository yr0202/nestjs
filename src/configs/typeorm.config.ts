import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Board } from "src/boards/entities/board.entity";
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: dbConfig.synchronize
}

// type: 'mysql',
// host: 'localhost',
// port: 3306,
// username: 'root',
// password: 'sqldbfka9820@',
// database : 'board_project',
// autoLoadEntities: true,
// entities: [Board,User],
// synchronize : true // 운영모드에서는 사용하지 말라?
