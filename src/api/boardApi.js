import axios from 'axios';
import useAuthStore from '../store/authStore';

// 인증 토큰 헤더 생성
const authHeader = () => {
  const { tokenType, accessToken } = useAuthStore.getState();
  return accessToken
    ? { Authorization: `${tokenType || 'Bearer'} ${accessToken}` }
    : {};
};

// 3.1 게시글 목록 가져오기
export const getBoards = (page, size = 10) =>
  axios.get('/api/v1/boards', { params: { page, size } });

// 3.2 게시글 상세 가져오기
export const getBoard = (boardId) =>
  axios.get(`/api/v1/boards/${boardId}`);

// 3.2.1 게시글 수정
export const updateBoard = (boardId, data) =>
  axios.patch(`/api/v1/boards/${boardId}`, data, { headers: authHeader() });

// 3.3 게시글 등록
export const createBoard = (data) =>
  axios.post('/api/v1/boards', data, { headers: authHeader() });

// 3.2.2 / 3.4 게시글 삭제 (boardIds=10 또는 10,11,12)
export const deleteBoards = (boardIds) =>
  axios.delete('/api/v1/boards', {
    params: { boardIds: boardIds.join(',') },
    headers: authHeader(),
  });
