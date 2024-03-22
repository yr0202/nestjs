import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsModule } from './boards.module';
import { v1 as uuid} from 'uuid'; // v1 버전을 쓴다, 이름을 uuid로 한다

@Injectable()
export class BoardsService {
    //게시판에 대한 data를 담기
    //private 사용 이유: 다른 컴포넌트에서 수정 못하게 하려고
    private boards: Board[] = [];


    getAllBoards(): Board[] { //boards에 들어있는 모든 배열값을 가져온다
        return this.boards; // 해당 클래스에 있는 boards 모든 값을 return
    }

    createBoard(title: string, description:string){
        //보드를 만들때는 제목과 내용, 게시글이 공개/비공개인지 알려줘야함
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

}
