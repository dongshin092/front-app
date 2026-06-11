import {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoards,
} from '../api/boardApi';

// 3.1 게시글 목록 가져오기
// 응답 양식:
// { code, data: [], page, size, totalElements, totalPages, first, last }
export const fetchBoards = async (page, size = 10) => {
  const res = await getBoards(page, size);
  const body = res.data;
  return {
    items: body.data ?? [],
    totalPages: body.totalPages ?? 1,
  };
};

// 3.2 게시글 상세
// 응답 양식: { code, data: { boardId, title, contents, writer, readCount, createAt } }
export const fetchBoard = async (boardId) => {
  const res = await getBoard(boardId);
  return res.data.data;
};

// 3.3 게시글 등록
export const writeBoard = (title, contents) =>
  createBoard({ title, contents });

// 3.2.1 게시글 수정
export const editBoard = (boardId, title, contents) =>
  updateBoard(boardId, { title, contents });

// 3.2.2 / 3.4 게시글 삭제 (단건/다건 모두 배열로 전달)
export const removeBoards = (boardIds) => deleteBoards(boardIds);
