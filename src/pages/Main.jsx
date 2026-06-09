import { Link } from 'react-router';
import { LayoutList, Users } from 'lucide-react';

function Main() {
  return (
    <div className="flex flex-col bg-[#F9FAFB]">
      <section className="flex flex-col items-center justify-center gap-4 pt-20 pb-[60px]">
        <h1 className="text-center text-[40px] font-bold text-[#1A1A1A]">
          환영합니다
        </h1>
        <p className="text-center text-[18px] text-[#6B7280]">
          게시판과 회원정보를 관리할 수 있는 플랫폼입니다
        </p>
      </section>

      <div className="flex justify-center gap-6 px-20">
        <div className="flex w-full flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white px-8 pt-8 pb-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#EFF6FF]">
            <LayoutList size={24} className="text-[#2563EB]" />
          </div>
          <Link to="/board" className="text-xl font-semibold text-[#1A1A1A] hover:text-[#2563EB]">게시판</Link>
          <p className="text-sm leading-relaxed text-[#6B7280]">
            공지사항, 자유게시판 등 다양한 게시판을 관리하세요.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white px-8 pt-8 pb-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#EFF6FF]">
            <Users size={24} className="text-[#2563EB]" />
          </div>
          <h2 className="text-xl font-semibold text-[#1A1A1A]">회원정보</h2>
          <p className="text-sm leading-relaxed text-[#6B7280]">
            회원 목록 조회, 정보 수정 및 권한을 관리하세요.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
