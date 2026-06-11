import axios from 'axios';

// 2. 로그인 api 연동 (POST, x-www-form-urlencoded)
export const login = (userId, passwd) => {
  const params = new URLSearchParams();
  params.append('userId', userId);
  params.append('passwd', passwd);

  return axios.post('/api/v1/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};
