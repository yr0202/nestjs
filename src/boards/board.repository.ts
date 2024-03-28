import { DataSource, EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum.";
import { Injectable } from "@nestjs/common";


@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }
    
    async createBoard(createBoardDto:CreateBoardDto):Promise<Board>{
        const {title, description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.save(board);
        return board;
    }

    async getBoardById(id: number) {
        // return await this.findOne( id as any );
    	return await this.findOne( {where:{ id }} );
    }

    // async deleteBoard(id: number){
    //     return await this.delete(id);
    // }
}


// @EntityRepository(Board)
// export class BoardRepository extends Repository<Board>{
//     async createBoard(createBoardDto: CreateBoardDto) : Promise<Board> {
//         const {title, description} = createBoardDto;

//         const board = this.create({ 
//             title, 
//             description,
//             status: BoardStatus.PUBLIC,
//         })

//         await this.save(board);
//         return board;
//     }
// }