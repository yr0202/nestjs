import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MyboardsModule } from './myboards/myboards.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardsModule,
    AuthModule,
    MyboardsModule,
  ],
})
export class AppModule { }
