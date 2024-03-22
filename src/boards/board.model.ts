// interface는 변수 타입만 체크
// class는변수 타입 체크 + 인스턴스 생성

export interface Board{ // board 모델 생성
    id: string;
    title: string;
    description: string;
    status: BoardStatus; 
    // BoardStatus란 게시물이 공개/비공개인지 나누는 것
    // 이 두가지 상태 이외에는 나오면 안되기 때문에 이 두가지 상태만 나올 수 있게
    // 하기 위해서 ts의 기능은 enumeration을 이용
    // PUBLIC or PRIVATE 값만 나오게 
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}