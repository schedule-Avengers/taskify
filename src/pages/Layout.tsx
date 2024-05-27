import { Outlet } from 'react-router-dom';
import Header from '@/components/common/Header';
import Nav from '@components/common/Nav';

export default function layout() {
  return (
    <>
      <Nav>
        <Header />
        <Outlet />
      </Nav>
    </>
  );
}
