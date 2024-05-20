import { Outlet } from 'react-router-dom';
import Header from '@/components/common/Header';

export default function layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
