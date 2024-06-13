import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { AssigneeProps } from '@/types/types';

const cx = classNames.bind(styles);

const getColorClass = (id: number) => {
  const colorIndex = (id % 5) + 1;
  return `color-${colorIndex}`;
};

interface ProfileProps {
  user: AssigneeProps;
  lg?: boolean; // size 속성의 선택적 타입 정의 (선택사항)
}

const Profile: React.FC<ProfileProps> = ({ user, lg }) => {
  const getInitial = (id: string) => id.charAt(0).toUpperCase();

  return (
    <div className={cx('profile', { lg })}>
      {user.profileImageUrl ? (
        <img src={user.profileImageUrl} alt='User profile picture' />
      ) : (
        <p className={cx('initial', { lg }, getColorClass(user.id))}>
          {getInitial(user.nickname)}
        </p>
      )}
    </div>
  );
};

export default Profile;
