import { Inject, Injectable, NotFoundException, Param } from '@nestjs/common';
import {  BoardStatus } from './board-status.enum.';
import { BoardsModule } from './boards.module';
import { v1 as uuid} from 'uuid'; // v1 버전을 쓴다, 이름을 uuid로 한다
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}

  
    // getAllBoards(): Board[] { 
    //     return this.boards; 
    // }

    // createBoard(createBoardDto:CreateBoardDto){
        
    //     const {title, description} = createBoardDto;
    //     const board:Board = {
    //         id: uuid(),
    //         title, 
    //         description, 
    //         status : BoardStatus.PUBLIC 
    //     }
        
    //     this.boards.push(board);
    //     return board;
    // }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto);
        // const {title, description} = createBoardDto;

        // const board = this.boardRepository.create({
        //     title,
        //     description,
        //     status: BoardStatus.PUBLIC
        // })

        // await this.boardRepository.save(board);
        // return board;
    }

    async getBoardById(id:number): Promise<Board> {
        const found = await this.boardRepository.findOne({ where: { id } });

        if(!found){
            throw new NotFoundException(`Cant't find Board with id &{id}`);
        }

        return found;
    }

    // getBoardById(id: string) :Board{
    //     const found = this.boards.find( (board) => board.id === id);
        
        
    //     if(!found){
    //         throw new NotFoundException("Can't find Board with id");
    //     }

    //     return found; 

    // }

    async deleteBoard(id:number):Promise<void>{
        const result = await this.boardRepository.delete(id);
        console.log('result',result);
        if (result.affected === 0) {
            throw new NotFoundException(`Board with ID ${id} not found`);
          }
    }

    // deleteBoard(id: string):void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id:string, status:BoardStatus):Board{
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }

}
