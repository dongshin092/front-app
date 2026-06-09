import { Link, NavLink } from 'react-router';

function Header() {
  const menuClass = ({ isActive }) =>
    `text-[15px] font-medium border-b-2 pb-0.5 ${
      isActive
        ? 'text-[#2563EB] border-[#2563EB]'
        : 'text-[#1A1A1A] border-transparent'
    }`;

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

      <Link
        to="/login"
        className="flex items-center justify-center rounded-md bg-[#2563EB] px-6 py-2.5 text-sm font-medium text-white"
      >
        로그인
      </Link>
    </header>
  );
}

export default Header;
