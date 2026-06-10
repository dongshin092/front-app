import axios from 'axios';



// 5.1 아이디 중복체크
export const checkUserId = (userId) =>
  axios.get('/api/v1/users/check-id', { params: { userId } });

// 5.2 회원가입
export const signup = (data) => axios.post('/api/v1/users/signup', data);
