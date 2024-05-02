import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Landing from './pages/landing';
import SignIn from './pages/signin';
import SignUp from './pages/siginup';
import MyDashBoard from './pages/mydashboard';
import DashBoard from './pages/dashboard';
import MyPage from './pages/mypage';
import Layout from './pages/Layout';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    //latout outlet줘서 아래는 children에 속하게 됨 모든 하위주소들은 '/'가 포함되어 있다.
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
      //   {
      //     path: 'dashboard/:dashboard',
      //     element: <DashBoardDetail />,
      //   },
      {
        path: 'mypage',
        element: <MyPage />,
      },
    ],
  },
  //layout에 속하지 않는 라우터 설정
  {
    path: '/signin',
    element: <SignIn />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={true} />
    <RouterProvider router={router}></RouterProvider>
  </QueryClientProvider>,
);
