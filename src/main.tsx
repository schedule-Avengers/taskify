import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Landing from '@pages/Landing';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/SignUp';
import MyDashBoard from '@pages/MyDashBoard';
import DashBoard from '@pages/DashBoard';
import MyPage from '@pages/MyPage';
import Layout from '@/pages/Layout';
import NotFound from '@pages/NotFound';

const queryClient = new QueryClient();

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
      // {
      //   path: 'dashboard/:dashboard',
      //   element: <DashBoardDetail />,
      // },
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
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={true} />
    <RouterProvider router={router}></RouterProvider>
  </QueryClientProvider>,
);
