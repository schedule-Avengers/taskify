import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './PasswordChangeForm.module.scss';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import BaseButton from '@components/common/BaseButton';

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

  const [showPasswords, setShowPasswords] = useState(false);

  const onSubmit: SubmitHandler<PasswordFormData> = (data) => {
    console.log(data);
  };

  const togglePasswordVisibility = () => {
    setShowPasswords((prevState) => !prevState);
  };

  return (
    <div className={cx('input-password')}>
      <h2>비밀번호 변경</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={cx('password-form')}>
        <div className={cx('input-password-inputs')}>
          <div className={cx('input')}>
            <label htmlFor='currentPassword'>현재 비밀번호</label>
            <div className={cx('password-input-container')}>
              <input
                type={showPasswords ? 'text' : 'password'}
                {...register('currentPassword', {
                  required: '현재 비밀번호를 입력해 주세요',
                })}
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className={cx('password-toggle')}
              >
                {showPasswords ? (
                  <FaRegEyeSlash className={cx('password-toggle-button')} />
                ) : (
                  <FaRegEye className={cx('password-toggle-button')} />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <span className={cx('error-message')}>
                {errors.currentPassword.message}
              </span>
            )}
          </div>
          <div className={cx('input')}>
            <label htmlFor='newPassword'>새 비밀번호</label>
            <div className={cx('password-input-container')}>
              <input
                type={showPasswords ? 'text' : 'password'}
                {...register('newPassword', {
                  required: '새 비밀번호를 입력해 주세요',
                  minLength: {
                    value: 6,
                    message: '비밀번호는 최소 6자 이상이어야 합니다',
                  },
                  validate: (value) =>
                    value !== watch('currentPassword') ||
                    '새 비밀번호는 현재 비밀번호와 다르게 설정해 주세요',
                })}
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className={cx('password-toggle')}
              >
                {showPasswords ? (
                  <FaRegEyeSlash className={cx('password-toggle-button')} />
                ) : (
                  <FaRegEye className={cx('password-toggle-button')} />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <span className={cx('error-message')}>
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className={cx('input')}>
            <label htmlFor='confirmPassword'>새 비밀번호 확인</label>
            <div className={cx('password-input-container')}>
              <input
                type={showPasswords ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: '새 비밀번호를 다시 입력해 주세요',
                  validate: (value) =>
                    value === watch('newPassword') ||
                    '비밀번호가 일치하지 않습니다',
                })}
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className={cx('password-toggle')}
              >
                {showPasswords ? (
                  <FaRegEyeSlash className={cx('password-toggle-button')} />
                ) : (
                  <FaRegEye className={cx('password-toggle-button')} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={cx('error-message')}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <div className={cx('submitbutton')}>
          <BaseButton text='변경' size='md' type='submit' />
        </div>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
