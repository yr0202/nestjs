import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsModule } from './boards.module';
import { v1 as uuid} from 'uuid'; // v1 버전을 쓴다, 이름을 uuid로 한다
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    //게시판에 대한 data를 담기
    //private 사용 이유: 다른 컴포넌트에서 수정 못하게 하려고
    private boards: Board[] = [];


    getAllBoards(): Board[] { //boards에 들어있는 모든 배열값을 가져온다
        return this.boards; // 해당 클래스에 있는 boards 모든 값을 return
    }

    createBoard(createBoardDto:CreateBoardDto){
        //보드를 만들때는 제목과 내용, 게시글이 공개/비공개인지 알려줘야함
        const {title, description} = createBoardDto;
        const board:Board = {
            id: uuid(),
            title, //title : title, js에서는 같을때 이렇게 하나만 써줘도 됨
            description, //description : description,
            status : BoardStatus.PUBLIC //기본값은 공개로 설정
        }
        //게시판 생성한걸 boards[]에 넣어줘야함
        this.boards.push(board);
        return board;
    }

    //find() 메소드를 사용함
    //find는 boards 배열에서 id랑 맞는 게시물을 찾기 위한 메서드
    getBoardById(id: string) :Board{
        const found = this.boards.find( (board) => board.id === id);
        // boards배열에서 board 하나를 가져오고 그 보드 하나에 아이디랑
        //파라미터로 들어온 id랑 같은걸 찾는다
        //화살표 함수 (board) => board.id === id는 콜백 함수로서 find() 메서드에 전달
        //여기서 board는 배열의 각 요소를 대표하는 변수
        //find() 메서드는 배열을 반복하면서 이 콜백 함수를 각 요소에 대해 호출하며,
        //id가 일치하는 첫 번째 요소를 찾으면 해당 요소를 반환합니다.
        
        if(!found){
            throw new NotFoundException("Can't find Board with id");
        }

        return found; 

    }

    // filter() 메소드는 필터링 하는 메소드
    deleteBoard(id: string):void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    updateBoardStatus(id:string, status:BoardStatus):Board{
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }

}
