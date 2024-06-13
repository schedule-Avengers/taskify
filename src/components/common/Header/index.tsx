import classNames from 'classnames/bind';
import styles from './header.module.scss';

const cx = classNames.bind(styles);

export default function index() {
  return <div className={cx('header')}>내가 헤더다.</div>;
}
