import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Landing from '@/pages/landing';
import SignIn from '@/pages/signin';
import SignUp from '@/pages/signup';
import MyDashBoard from '@/pages/mydashboard';
import DashBoard from '@/pages/dashboard';
import DashBoardDetail from '@/components/dashboard/DashBoardDetail';
import MyPage from '@pages/MyPage';
import Layout from '@/pages/Layout';
import NotFound from '@/pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <NotFound />,
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    // Layout 컴포넌트에 속하는 경로들을 children으로 설정
    children: [
      {
        path: 'mydashboard',
        element: <MyDashBoard />,
      },
      {
        path: 'dashboard',
        element: <DashBoard />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            element: <DashBoard />,
          },
          {
            path: ':dashboard',
            element: <DashBoardDetail />,
          },
        ],
      },
    ],
  },
  // Layout에 속하지 않는 라우터 설정
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
