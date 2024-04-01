import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardRepository } from './board.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';

@Module({
  imports :[
    TypeOrmModule.forFeature([Board])
  ],
  controllers: [BoardsController],
  providers: [
    BoardsService,
    BoardRepository
  ],
})
export class BoardsModule {}
