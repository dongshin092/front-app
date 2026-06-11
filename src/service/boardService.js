import { getBoards } from '../api/boardApi';

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
