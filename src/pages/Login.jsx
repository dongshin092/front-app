import { useNavigate } from 'react-router';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
      <div className="flex w-[400px] flex-col gap-6 rounded-xl border border-[#E5E7EB] bg-white p-10">
        <h1 className="text-center text-[28px] font-bold text-[#1A1A1A]">로그인</h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1A1A1A]">아이디</label>
            <input
              type="text"
              placeholder="ID를 입력하세요"
              className="h-11 rounded-lg border border-[#E5E7EB] px-3.5 text-sm text-[#1A1A1A] placeholder:text-[#6B7280]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1A1A1A]">비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="h-11 rounded-lg border border-[#E5E7EB] px-3.5 text-sm text-[#1A1A1A] placeholder:text-[#6B7280]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={handleLogin}
            className="flex h-12 items-center justify-center rounded-lg bg-[#2563EB] text-base font-semibold text-white"
          >
            로그인
          </button>

          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[13px] text-[#6B7280]">계정이 없으신가요?</span>
            <span className="text-[13px] font-semibold text-[#7C3AED]">회원가입</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
