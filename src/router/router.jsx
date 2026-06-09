import { createBrowserRouter } from 'react-router';
import MainPage from '../pages/MainPage';
import Main from '../pages/Main';
import Board from '../pages/Board';
import Member from '../pages/Member';
import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      { index: true, element: <Main /> },
      { path: 'board', element: <Board /> },
      { path: 'member', element: <Member /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
