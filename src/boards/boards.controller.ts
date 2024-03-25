import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {

    //의존성 주입 => BoardsService를 controller에서 사용할 수 있다
    constructor(private boardsService: BoardsService){}
    // 접근제한자를 생성자 파라미터에 선언하면 접근 제한자가 사용된
    // 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언된다
    // boardsService가 프로퍼티로 선언됨
    // 이제 BoardsService에 있는 속성들을 boardsService로 사용 가능하게 됨
    
    @Get('/')
    getAllBoard(): Board[]{ 
        // 타입을 정의해주면 좋은 이유: 타입정의는 선택사항, 타입을 정의해줌으로써 원하는 타입과 다른 코드를 사욯할 시 에러가 발생
        // readable : Board라는 모델에 배열이 와야하는구나 하고 알 수 있다
        return this.boardsService.getAllBoards();
        //boardsService가 프로퍼티로 선언되면서 BoardsService안에 있는
        //메서드나 등등을 사용할 수 있게됨
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto
    ):Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    // @Post('/')
    // createBoard(
    //     @Body('title') title: string,
    //     @Body('description') description: string
    // ):Board {
    //     return this.boardsService.createBoard(title, description);
    // }



    // localhost:3000?id=ads
    // 위에 주소에 찾고자 하는 id를 body로 해서 가져오는게 아니라
    // 파람으로 받아오면 됨
    @Get('/:id')
    getBoardById(@Param('id') id: string):Board{
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id:string): void{
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id:string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
    
}
