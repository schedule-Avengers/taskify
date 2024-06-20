import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useForm,
  FieldError,
  FieldErrorsImpl,
  Merge,
  SubmitHandler,
} from 'react-hook-form';
import IconArrowLeft from '@/image/ic_arrow_left.svg?react';
import IconAdd from '@/image/ic_add_withoutbackgound.svg?react';
import IconX from '@/image/ic_redx.svg?react';
import classNames from 'classnames/bind';
import styles from '@/MyPage.module.scss';
import BaseButton from '@/components/common/BaseButton';

const cx = classNames.bind(styles);

type ErrorType =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined;

type ProfileFormData = {
  profilePicture: File | null;
  nickname: string;
};

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const originalNickname = 'originalNickname'; // 원래 닉네임 값

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    defaultValues: {
      nickname: originalNickname, // 닉네임 기본값 설정
    },
  });
  const [preview, setPreview] = useState<string | null>(null);
  const profilePicture = watch('profilePicture');
  const nickname = watch('nickname');

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    console.log(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue('profilePicture', file);
    }
  };

  const handleFileRemove = () => {
    setPreview(null);
    setValue('profilePicture', null);
  };

  const getErrorMessage = (error: ErrorType) => {
    if (!error) return null;
    if (typeof error.message === 'string') return error.message;
    return '오류가 발생했습니다.';
  };

  return (
    <div className={cx('body')}>
      <button className={cx('goback')} onClick={() => navigate(-1)}>
        <IconArrowLeft className={cx('goback-button')} />
        <p className={cx('goback-word')}> 뒤로가기</p>
      </button>
      <div className={cx('inputs')}>
        <div className={cx('input-profile')}>
          <h2>프로필</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={cx('form')}>
            <div className={cx('input-profile-inputs')}>
              <div>
                <label htmlFor='profilePicture'></label>
                <input
                  type='file'
                  id='profilePicture'
                  style={{ display: 'none' }}
                  {...register('profilePicture')}
                  onChange={handleFileChange}
                />
                <label htmlFor='profilePicture' className={cx('upload-label')}>
                  {preview ? (
                    <div className={cx('pictures')}>
                      <img src={preview} alt='Profile Preview' />
                      <IconX
                        onClick={handleFileRemove}
                        className={cx('remove-button')}
                      />
                    </div>
                  ) : (
                    <div className={cx('pictures')}>
                      <IconAdd title='Upload Icon' />
                    </div>
                  )}
                </label>
                {errors.profilePicture && (
                  <span>{getErrorMessage(errors.profilePicture)}</span>
                )}
              </div>
              <div className={cx('emailandnickname')}>
                <div className={cx('input')}>
                  <label htmlFor='email'>이메일</label>
                  <input
                    type='email'
                    defaultValue='example@example.com' // 이메일 기본값 설정
                    readOnly
                    style={{ opacity: 0.5 }}
                  />
                </div>
                <div className={cx('input')}>
                  <label htmlFor='nickname'>닉네임</label>
                  <input
                    type='text'
                    {...register('nickname', {
                      required: '닉네임을 입력해 주세요',
                      validate: (value) =>
                        value !== originalNickname ||
                        '원래 닉네임과 같습니다. 다른 닉네임을 입력해 주세요.',
                    })}
                  />
                </div>
                {errors.nickname && (
                  <span>{getErrorMessage(errors.nickname)}</span>
                )}
              </div>
            </div>
            <BaseButton text='저장' size='md' type='submit' />
          </form>
        </div>
        <div className={cx('input-password')}>
          <p>비밀번호</p>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
