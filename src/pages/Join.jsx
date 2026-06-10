import { useState } from 'react';
import { useNavigate } from 'react-router';
import DaumPostcode from 'react-daum-postcode';
import Header from './Header';
import { checkUserIdDuplicate, signupUser } from '../service/userService';

const inputBase =
  'h-11 rounded-lg border px-3.5 text-sm text-[#1A1A1A] placeholder:text-[#6B7280]';

function Join() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: '',
    emailLocal: '',
    emailDomain: 'naver.com',
    name: '',
    dob: '',
    gender: 'male',
    password: '',
    passwordConfirm: '',
    phonePrefix: '010',
    phoneMid: '',
    phoneLast: '',
    postalCode: '',
    address: '',
    detailAddress: '',
  });
  const [errors, setErrors] = useState({});
  const [openPostcode, setOpenPostcode] = useState(false);
  const [idChecked, setIdChecked] = useState(false);

  const errorKeyMap = {
    userId: 'userId',
    emailLocal: 'email',
    name: 'name',
    dob: 'dob',
    gender: 'gender',
    password: 'password',
    passwordConfirm: 'passwordConfirm',
    phoneMid: 'phone',
    phoneLast: 'phone',
    address: 'address',
  };

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    const errorKey = errorKeyMap[key];
    if (errorKey && value) {
      setErrors((prev) => ({ ...prev, [errorKey]: undefined }));
    }
    // 아이디를 변경하면 중복체크를 다시 하도록 한다
    if (key === 'userId') {
      setIdChecked(false);
    }
  };

  const passwordMatch =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;
  const passwordMismatch =
    form.passwordConfirm.length > 0 && form.password !== form.passwordConfirm;

  const validate = () => {
    const next = {};
    if (!form.userId.trim()) next.userId = '아이디를 입력해주세요.';
    if (!form.emailLocal.trim()) next.email = '이메일을 입력해주세요.';
    if (!form.name.trim()) next.name = '이름을 입력해주세요.';
    if (!form.dob.trim()) next.dob = '생년월일을 입력해주세요.';
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(form.dob))
      next.dob = 'YYYY-MM-DD 형식으로 입력해주세요.';
    if (!form.gender) next.gender = '성별을 선택해주세요.';
    if (!form.password) next.password = '패스워드를 입력해주세요.';
    if (!form.passwordConfirm)
      next.passwordConfirm = '패스워드 확인을 입력해주세요.';
    else if (form.password !== form.passwordConfirm)
      next.passwordConfirm = '패스워드가 일치하지 않습니다.';
    if (!form.phoneMid.trim() || !form.phoneLast.trim())
      next.phone = '핸드폰번호를 입력해주세요.';
    if (!form.address.trim()) next.address = '주소를 검색해주세요.';
    return next;
  };

  const handleCheckId = async () => {
    if (!form.userId.trim()) {
      setErrors((prev) => ({ ...prev, userId: '아이디를 입력해주세요.' }));
      return;
    }
    try {
      const available = await checkUserIdDuplicate(form.userId);
      if (available) {
        setIdChecked(true);
        alert('사용 가능한 아이디입니다.');
      } else {
        setIdChecked(false);
        alert('이미 사용 중인 아이디입니다.');
      }
    } catch {
      alert('아이디 중복체크에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleSubmit = async () => {
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // 아이디 중복체크를 하지 않으면 회원가입 불가
    if (!idChecked) {
      alert('아이디 중복체크를 해주세요.');
      return;
    }

    try {
      await signupUser(form);
      alert('회원가입에 성공했습니다.');
      navigate('/login');
    } catch {
      alert('회원가입에 실패했습니다. 입력 정보를 확인해주세요.');
    }
  };

  const handleComplete = (data) => {
    setField('address', data.address);
    setForm((prev) => ({ ...prev, postalCode: data.zonecode }));
    setOpenPostcode(false);
  };

  const goLogin = () => {
    navigate('/login');
  };

  const borderClass = (hasError) =>
    hasError ? 'border-[#EF4444]' : 'border-[#E5E7EB]';

  const errorText = (message) =>
    message ? <span className="text-xs text-[#EF4444]">{message}</span> : null;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Header />
      <div className="flex items-center justify-center py-10">
        <div className="flex w-[560px] flex-col gap-5 rounded-xl border border-[#E5E7EB] bg-white px-10 py-9">
          <h1 className="text-center text-[26px] font-bold text-[#1A1A1A]">
            회원가입
          </h1>

          {/* Top Fields */}
          <div className="flex flex-col gap-4">
            {/* ID Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1A1A1A]">아이디</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={form.userId}
                  onChange={(e) => setField('userId', e.target.value)}
                  placeholder="아이디를 입력하세요"
                  className={`${inputBase} flex-1 ${borderClass(errors.userId)}`}
                />
                <button
                  type="button"
                  onClick={handleCheckId}
                  className="rounded-lg bg-[#2563EB] px-4 py-2.5 text-[13px] font-medium text-white"
                >
                  중복확인
                </button>
              </div>
              {idChecked && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#10B981]">✓</span>
                  <span className="text-xs text-[#10B981]">
                    사용 가능한 아이디입니다
                  </span>
                </div>
              )}
              {errorText(errors.userId)}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1A1A1A]">이메일</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={form.emailLocal}
                  onChange={(e) => setField('emailLocal', e.target.value)}
                  placeholder="이메일"
                  className={`${inputBase} flex-1 ${borderClass(errors.email)}`}
                />
                <span className="text-sm text-[#6B7280]">@</span>
                <select
                  value={form.emailDomain}
                  onChange={(e) => setField('emailDomain', e.target.value)}
                  className="h-11 w-[180px] rounded-lg border border-[#E5E7EB] px-3.5 text-sm text-[#1A1A1A]"
                >
                  <option>naver.com</option>
                  <option>gmail.com</option>
                  <option>daum.net</option>
                </select>
              </div>
              {errorText(errors.email)}
            </div>

            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1A1A1A]">이름</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                placeholder="이름을 입력하세요"
                className={`${inputBase} ${borderClass(errors.name)}`}
              />
              {errorText(errors.name)}
            </div>

            {/* DOB Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1A1A1A]">생년월일</label>
              <input
                type="text"
                value={form.dob}
                onChange={(e) => setField('dob', e.target.value)}
                placeholder="YYYY-MM-DD"
                className={`${inputBase} ${borderClass(errors.dob)}`}
              />
              {errorText(errors.dob)}
            </div>

            {/* Gender Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1A1A1A]">성별</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setField('gender', 'male')}
                  className={`h-11 flex-1 rounded-lg text-sm font-medium ${
                    form.gender === 'male'
                      ? 'bg-[#2563EB] text-white'
                      : 'border border-[#E5E7EB] bg-white text-[#1A1A1A]'
                  }`}
                >
                  남성
                </button>
                <button
                  type="button"
                  onClick={() => setField('gender', 'female')}
                  className={`h-11 flex-1 rounded-lg text-sm font-medium ${
                    form.gender === 'female'
                      ? 'bg-[#2563EB] text-white'
                      : 'border border-[#E5E7EB] bg-white text-[#1A1A1A]'
                  }`}
                >
                  여성
                </button>
              </div>
              {errorText(errors.gender)}
            </div>
          </div>

          {/* Bottom Fields */}
          <div className="flex flex-col gap-4">
            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1A1A1A]">패스워드</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setField('password', e.target.value)}
                placeholder="패스워드를 입력하세요"
                className={`${inputBase} ${borderClass(errors.password)}`}
              />
              {errorText(errors.password)}
            </div>

            {/* Password Confirm Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1A1A1A]">
                패스워드 확인
              </label>
              <input
                type="password"
                value={form.passwordConfirm}
                onChange={(e) => setField('passwordConfirm', e.target.value)}
                placeholder="패스워드를 다시 입력하세요"
                className={`${inputBase} ${borderClass(
                  errors.passwordConfirm || passwordMismatch
                )}`}
              />
              {passwordMatch && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#10B981]">✓</span>
                  <span className="text-xs text-[#10B981]">
                    패스워드가 일치합니다
                  </span>
                </div>
              )}
              {passwordMismatch && (
                <span className="text-xs text-[#EF4444]">
                  패스워드가 일치하지 않습니다.
                </span>
              )}
              {!passwordMismatch && errorText(errors.passwordConfirm)}
            </div>

            {/* Phone Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1A1A1A]">
                핸드폰번호
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={form.phonePrefix}
                  onChange={(e) => setField('phonePrefix', e.target.value)}
                  className="h-11 w-[100px] rounded-lg border border-[#E5E7EB] px-3.5 text-sm text-[#1A1A1A]"
                >
                  <option>010</option>
                  <option>011</option>
                  <option>016</option>
                </select>
                <span className="text-sm text-[#6B7280]">-</span>
                <input
                  type="text"
                  value={form.phoneMid}
                  onChange={(e) => setField('phoneMid', e.target.value)}
                  placeholder="0000"
                  className={`${inputBase} flex-1 ${borderClass(errors.phone)}`}
                />
                <span className="text-sm text-[#6B7280]">-</span>
                <input
                  type="text"
                  value={form.phoneLast}
                  onChange={(e) => setField('phoneLast', e.target.value)}
                  placeholder="0000"
                  className={`${inputBase} flex-1 ${borderClass(errors.phone)}`}
                />
              </div>
              {errorText(errors.phone)}
            </div>

            {/* Postal Code Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1A1A1A]">우편번호</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={form.postalCode}
                  readOnly
                  placeholder="우편번호"
                  className={`${inputBase} w-[140px] border-[#E5E7EB]`}
                />
                <button
                  type="button"
                  onClick={() => setOpenPostcode(true)}
                  className="rounded-lg bg-[#2563EB] px-4 py-2.5 text-[13px] font-medium text-white"
                >
                  우편번호 검색
                </button>
              </div>
            </div>

            {/* Address Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1A1A1A]">주소</label>
              <input
                type="text"
                value={form.address}
                readOnly
                placeholder="주소를 검색하세요"
                className={`${inputBase} ${borderClass(errors.address)}`}
              />
              {errorText(errors.address)}
            </div>

            {/* Detail Address Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1A1A1A]">상세주소</label>
              <input
                type="text"
                value={form.detailAddress}
                onChange={(e) => setField('detailAddress', e.target.value)}
                placeholder="상세주소를 입력하세요"
                className={`${inputBase} border-[#E5E7EB]`}
              />
            </div>
          </div>

          {/* Submit Section */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex h-12 w-full items-center justify-center rounded-lg bg-[#2563EB] text-base font-semibold text-white"
            >
              가입하기
            </button>

            <div className="flex items-center justify-center gap-1.5">
              <span className="text-[13px] text-[#6B7280]">
                이미 계정이 있으신가요?
              </span>
              <span
                onClick={goLogin}
                className="cursor-pointer text-[13px] font-semibold text-[#2563EB]"
              >
                로그인
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 다음 우편번호 검색 모달 */}
      {openPostcode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setOpenPostcode(false)}
        >
          <div
            className="w-[500px] overflow-hidden rounded-xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3">
              <span className="text-sm font-semibold text-[#1A1A1A]">
                주소 검색
              </span>
              <button
                type="button"
                onClick={() => setOpenPostcode(false)}
                className="text-sm text-[#6B7280]"
              >
                ✕
              </button>
            </div>
            <DaumPostcode onComplete={handleComplete} style={{ height: 450 }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Join;
