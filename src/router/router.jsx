import { createBrowserRouter } from 'react-router';
import MainPage from '../pages/MainPage';
import Main from '../pages/Main';
import Board from '../pages/Board';
import BoardDetail from '../pages/BoardDetail';
import Member from '../pages/Member';
import Login from '../pages/Login';
import Join from '../pages/Join';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      { index: true, element: <Main /> },
      { path: 'board', element: <Board /> },
      { path: 'board/:boardId', element: <BoardDetail /> },
      { path: 'member', element: <Member /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/join',
    element: <Join />,
  },
]);

export default router;
