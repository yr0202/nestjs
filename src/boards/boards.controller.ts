import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum.';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './entities/board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('/boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardsController')
    constructor(private boardsService: BoardsService) { }

    @Get()
    getAllBoard(
        @GetUser() user: User
    ): Promise<Board[]> {
        this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardsService.getAllBoards(user);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto
    // ):Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() CreateBoardDto: CreateBoardDto,
        @GetUser() user: User,
    ): Promise<Board> {
        return this.boardsService.createBoard(CreateBoardDto, user);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string):Board{
    //     return this.boardsService.getBoardById(id);
    // }

    @Delete('/:id')
    deleteBoard(
        @Param('id') id: string,
        @GetUser() user: User
    ): Promise<void> {
        return this.boardsService.deleteBoard(+id, user);
    }
    // @Delete('/:id')
    // deleteBoard(@Param('id') id:string): void{
    //     this.boardsService.deleteBoard(id);
    // }


    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board> {
        return this.boardsService.uadateBoardStatus(id, status);
    }
    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id:string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    // ) {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }

}
