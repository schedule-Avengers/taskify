import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './PasswordChangeForm.module.scss';

const cx = classNames.bind(styles);

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string; // confirmPassword 필드 추가
};

const PasswordChangeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordFormData>();

  const onSubmit: SubmitHandler<PasswordFormData> = (data) => {
    console.log(data);
  };

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  return (
    <div className={cx('input-password')}>
      <form onSubmit={handleSubmit(onSubmit)} className={cx('password-form')}>
        <h2>비밀번호 변경</h2>

        <div>
          <label htmlFor='currentPassword'>현재 비밀번호</label>
          <input
            type='password'
            {...register('currentPassword', {
              required: '현재 비밀번호를 입력해 주세요',
            })}
          />
          {errors.currentPassword && (
            <span>{errors.currentPassword.message}</span>
          )}
        </div>

        <div>
          <label htmlFor='newPassword'>새 비밀번호</label>
          <input
            type='password'
            {...register('newPassword', {
              required: '새 비밀번호를 입력해 주세요',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상이어야 합니다',
              },
            })}
          />
          {errors.newPassword && <span>{errors.newPassword.message}</span>}
        </div>

        <div>
          <label htmlFor='confirmPassword'>새 비밀번호 확인</label>
          <input
            type='password'
            {...register('confirmPassword', {
              required: '새 비밀번호를 다시 입력해 주세요',
              validate: (value) =>
                value === newPassword || '비밀번호가 일치하지 않습니다',
            })}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type='submit'>변경</button>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
