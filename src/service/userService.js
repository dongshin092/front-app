import { checkUserId, signup } from '../api/userApi';

// 5.1 아이디 중복체크: 사용 가능하면 true, 중복이면 false
export const checkUserIdDuplicate = async (userId) => {
  const res = await checkUserId(userId);
  const data = res.data;
  // 응답이 boolean 이거나 { available } / { duplicated } 형태를 모두 수용
  if (typeof data === 'boolean') return data;
  if (typeof data?.available === 'boolean') return data.available;
  if (typeof data?.duplicated === 'boolean') return !data.duplicated;
  if (typeof data?.data?.available === 'boolean') return data.data.available;
  return false;
};

// 회원가입 form 상태를 API data 양식으로 변환
export const toSignupData = (form) => ({
  userId: form.userId,
  email: `${form.emailLocal}@${form.emailDomain}`,
  passwd: form.password,
  name: form.name,
  gender: form.gender === 'male' ? '남자' : '여자',
  birthDate: form.dob,
  phone: `${form.phonePrefix}-${form.phoneMid}-${form.phoneLast}`,
  postalCode: form.postalCode,
  address: form.address,
  addressDetail: form.detailAddress,
});

// 5.2 회원가입
export const signupUser = (form) => signup(toSignupData(form));
