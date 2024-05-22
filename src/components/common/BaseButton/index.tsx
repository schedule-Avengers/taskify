import classNames from 'classnames/bind';
import styles from './BaseButton.module.scss';
import InviteIcon from '@/assets/svgs/ic_invite.svg';

interface ButtonProps {
  text: string;
  size: 'lg' | 'md' | 'sm' | 'access' | 'invite' | 'main';
  type: 'button' | 'submit';
  decline?: boolean;
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const index = ({ text, size, decline, type, onClick }: ButtonProps) => {
  return (
    <button
      className={cx(`btn-${size}`, { 'btn-decline': decline })}
      type={type}
      onClick={onClick}
    >
      {size === 'invite' && (
        <InviteIcon className={cx(`btn-icon`)} />
        // <img src={InviteIcon} alt='InviteIcon' className={cx(`btn-icon`)}  />
      )}
      {text}
    </button>
  );
};

export default index;
