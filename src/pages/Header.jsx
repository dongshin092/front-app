import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuthStore from '../store/authStore';

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const name = useAuthStore((state) => state.name);
  const logout = useAuthStore((state) => state.logout);
  const [open, setOpen] = useState(false);

  const menuClass = ({ isActive }) =>
    `text-[15px] font-medium border-b-2 pb-0.5 ${
      isActive
        ? 'text-[#2563EB] border-[#2563EB]'
        : 'text-[#1A1A1A] border-transparent'
    }`;

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <header className="flex h-16 items-center border-b border-[#E5E7EB] bg-white px-10">
      <nav className="flex items-center gap-8">
        <Link to="/" className="text-lg font-bold text-[#1A1A1A]">
          MyApp
        </Link>
        <NavLink to="/board" className={menuClass}>
          게시판
        </NavLink>
        <NavLink to="/member" className={menuClass}>
          회원정보
        </NavLink>
      </nav>

      <div className="flex-1" />

      {isLoggedIn ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-1 text-sm font-medium text-[#1A1A1A]"
          >
            {name}
            <span className="text-xs text-[#6B7280]">▼</span>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-2 flex w-32 flex-col overflow-hidden rounded-md border border-[#E5E7EB] bg-white shadow-md">
              <Link
                to="/member"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#F8FAFC]"
              >
                회원정보
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2.5 text-left text-sm text-[#1A1A1A] hover:bg-[#F8FAFC]"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center justify-center rounded-md bg-[#2563EB] px-6 py-2.5 text-sm font-medium text-white"
        >
          로그인
        </Link>
      )}
    </header>
  );
}

export default Header;
