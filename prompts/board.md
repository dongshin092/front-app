
## 1. 게시판 api 연동
- Board 컴포넌트에서 서버 api 연동하기 

## api 경로 
- api 도메인 : https://sell-books.shop
- base uri :  /api/v1/boards

## 2. 게시판 기능 설명 
1. 게시글 목록 (페이지가 존재 )
2. 게시글 등록 (모달 창 존재)
3. 게시글 상세보기 (페이지 새로 생성)
4. 게시글 수정 (상세보기에서 처리)
5. 게시글 삭제 (상세보기 또는 리스트 체크박스로 처리)


## 3. API 연동 

### 3.1 게시글 목록 가져오기 
- endpoint : /api/v1/boards
- method : get
- parameter 
    - page : 이동할 페이지 번호
    - size : 한페이지에 보여줄 목록 개수 (default > 10 개)
- data 양식
```
{  
  "code": 200,
  "data": [
    {
      "boardId": 21,
      "title": "운영자에게 문의하는 방법",
      "writer": "관리자",
      "readCount": 95,
      "createAt": "2026-05-20T14:20:00"
    },
  ],
  "page": 0,
  "size": 10,
  "totalElements": 0,
  "totalPages": 0,
  "first": true,
  "last": true
}
```