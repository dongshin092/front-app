import { Outlet } from 'react-router';
import Header from './Header';

function MainPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Header />
      <Outlet />
    </div>
  );
}

export default MainPage;
