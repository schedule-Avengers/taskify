import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Landing from '@/pages/landing';
import SignIn from '@/pages/signin';
import SignUp from '@/pages/signup';
import MyDashBoard from '@/pages/mydashboard';
import DashBoard from '@/pages/dashboard';
import DashBoardDetail from '@/components/dashboard/DashBoardDetail';
import MyPage from '@/pages/mypage';
import Layout from '@/pages/Layout';
import NotFound from '@/pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    //layout outlet줘서 아래는 children에 속하게 됨 모든 하위주소들은 '/'가 포함되어 있다.
    children: [
      {
        path: '',
        element: <Landing />,
      },
      {
        path: 'mydashboard',
        element: <MyDashBoard />,
      },
      {
        path: 'dashboard',
        element: <DashBoard />,
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
  //layout에 속하지 않는 라우터 설정
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
