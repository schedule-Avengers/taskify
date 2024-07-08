import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconArrowLeft from '@/image/ic_arrow_left.svg?react';
import classNames from 'classnames/bind';
import styles from './MyPage.module.scss';
import ProfileForm from '@/components/MyPage/ProfileForm';
import PasswordChangeForm from '@/components/MyPage/PasswordChangeForm'; // 비밀번호 변경 폼을 import 합니다.

const cx = classNames.bind(styles);

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const originalNickname = 'originalNickname';

  return (
    <div className={cx('body')}>
      <button className={cx('goback')} onClick={() => navigate(-1)}>
        <IconArrowLeft className={cx('goback-button')} />
        <p className={cx('goback-word')}> 뒤로가기</p>
      </button>
      <div className={cx('inputs')}>
        <ProfileForm originalNickname={originalNickname} />
        <PasswordChangeForm />
      </div>
    </div>
  );
};

export default MyPage;
