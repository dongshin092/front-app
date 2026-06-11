import axios from 'axios';

// 3.1 게시글 목록 가져오기
export const getBoards = (page, size = 10) =>
  axios.get('/api/v1/boards', { params: { page, size } });
