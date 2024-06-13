import { Outlet } from 'react-router-dom';
import Header from '@/components/common/Header';
import SideBar from '@components/common/SideBar';
import classNames from 'classnames/bind';
import styles from './Layout.module.scss';

const cx = classNames.bind(styles);

export default function layout() {
  return (
    <div className={cx('content')}>
      <SideBar />
      <div className={cx('headerandbody')}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
