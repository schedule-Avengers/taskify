import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconArrowLeft from '@/image/ic_arrow_left.svg?react';
import classNames from 'classnames/bind';
import styles from './MyPage.module.scss';
import ProfileForm from '@/components/MyPage/ProfileForm';
import PasswordChangeForm from '@/components/MyPage/PasswordChangeForm'; // 비밀번호 변경 폼을 import 합니다.
import { useMyPage } from '@/hooks/mypage/useMyPage';

const cx = classNames.bind(styles);

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { get } = useMyPage;
  const { data: userInfo, isLoading: isUserLoading, error: userError } = get();

  if (isUserLoading) {
    return (
      <div className={cx('body')}>
        <div className={cx('skeleton')}>
          <div className={cx('skeleton-item', 'skeleton-large')} />
          <div className={cx('skeleton-item', 'skeleton-large')} />
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className={cx('body')}>
        <div className={cx('error-message')}>
          <p>Failed to load user information: {userError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cx('body')}>
      <button className={cx('goback')} onClick={() => navigate(-1)}>
        <IconArrowLeft className={cx('goback-button')} />
        <p className={cx('goback-word')}> 뒤로가기</p>
      </button>
      <div className={cx('inputs')}>
        <ProfileForm originalNickname={userInfo.nickname} />
        <PasswordChangeForm />
      </div>
    </div>
  );
};

export default MyPage;
