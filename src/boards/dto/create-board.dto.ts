// 게시판을 생성하기 위한 dto
// class를 이용해서 작성할 거임
// 클래스는 인터페이스와 다르게 런타임에서 작동하기 때문에
// 파이프 같은 기능을 이용할 때 더 유용

export class CreateBoardDto {
    title: string;
    description: string;
}

/* dto를 만들었으면 실제 컨트롤러와 서비스에서 dto를 적용*/ 