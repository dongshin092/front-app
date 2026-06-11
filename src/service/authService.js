import { login } from '../api/authApi';

// 2. 로그인 처리: 성공 시 응답 데이터 반환
// response: { tokenType, accessToken, expiresIn, userId, name }
export const loginUser = async (userId, passwd) => {
  const res = await login(userId, passwd);
  return res.data;
};
