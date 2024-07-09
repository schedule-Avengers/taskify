import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupValidationSchema } from '@hooks/validationSchema';
import { postAuthSignUp } from '@/axios/api';
import classNames from 'classnames/bind';
import styles from '@/pages/signup/signup.module.scss';
import Logo from '@/assets/svgs/logo.svg?react';
import Modal from '@/components/common/Modal/index';
import { AxiosError } from 'axios';

const cx = classNames.bind(styles);

interface Inputs {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  checkbox: boolean;
}

export default function index() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    trigger,
    clearErrors,
  } = useForm<Inputs>({
    resolver: yupResolver(signupValidationSchema),
  });

  useEffect(() => {
    setIsFormValid(isValid);
  }, [isValid]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await postAuthSignUp(data);
      setModalMessage('가입이 완료되었습니다!');
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/signin');
      }, 3000);
    } catch (error) {
      if (error instanceof AxiosError) {
        const signUpFailureMessage = error.response?.data.message;
        setModalMessage(signUpFailureMessage);
        setIsModalOpen(true);
      }
    }
  };

  return (
    <div className={cx('bg')}>
      <main className={cx('main')}>
        <div className={cx('mainTop')}>
          <Logo className={cx('logoImg')} />
          <p className={cx('mainTopText')}>첫 방문을 환영합니다!</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            className={`${cx('formLabel')} ${cx('formLabelEmail')}`}
            htmlFor='email'
          >
            이메일
          </label>
          <input
            id='email'
            placeholder='이메일을 입력해주세요'
            type='text'
            className={`${cx('formInput')} ${errors.email ? cx('error') : ''}`}
            {...register('email')}
            onBlur={() => trigger('email')}
            onFocus={() => clearErrors('email')}
          />
          {errors.email && (
            <span className={cx('errorMessage')}>{errors.email.message}</span>
          )}
          <label className={cx('formLabel')} htmlFor='nickname'>
            닉네임
          </label>
          <input
            id='nickname'
            placeholder='닉네임을 입력해 주세요'
            type='text'
            className={`${cx('formInput')} ${errors.nickname ? cx('error') : ''}`}
            {...register('nickname')}
            onBlur={() => trigger('nickname')}
            onFocus={() => clearErrors('nickname')}
          />
          {errors.nickname && (
            <span className={cx('errorMessage')}>
              {errors.nickname.message}
            </span>
          )}
          <label className={cx('formLabel')}>비밀번호</label>
          <input
            placeholder='8자 이상 입력해 주세요'
            type='password'
            className={`${cx('formInput')} ${errors.password ? cx('error') : ''}`}
            {...register('password')}
            onBlur={() => trigger('password')}
            onFocus={() => clearErrors('password')}
          />
          {errors.password && (
            <span className={cx('errorMessage')}>
              {errors.password.message}
            </span>
          )}
          <label className={cx('formLabel')}>비밀번호 확인</label>
          <input
            placeholder='비밀번호를 한번 더 입력해 주세요'
            type='password'
            className={`${cx('formInput')} ${errors.passwordConfirm ? cx('error') : ''}`}
            {...register('passwordConfirm')}
            onBlur={() => trigger('passwordConfirm')}
            onFocus={() => clearErrors('passwordConfirm')}
          />
          {errors.passwordConfirm && (
            <span className={cx('errorMessage')}>
              {errors.passwordConfirm.message}
            </span>
          )}
          <div className={cx('agreeContent')}>
            <input
              type='checkbox'
              id='checkbox'
              className={cx('agreeCheckbox')}
              {...register('checkbox')}
              onBlur={() => trigger('checkbox')}
              onFocus={() => clearErrors('checkbox')}
            />
            <label htmlFor='checkbox'>이용약관에 동의합니다.</label>
          </div>
          {errors.checkbox && (
            <span className={cx('errorMessage')}>
              {errors.checkbox.message}
            </span>
          )}
          <button
            type='submit'
            className={`${cx('submitButton')} ${isFormValid ? '' : cx('disabled')}`}
            disabled={!isFormValid || isSubmitting}
          >
            가입하기
          </button>
        </form>
        <div className={cx('goSignUpContent')}>
          <p className={cx('isSignUp')}>이미 가입하셨나요?</p>
          <Link to='/signin' className={cx('goSignup')}>
            로그인하기
          </Link>
        </div>
      </main>
      {isModalOpen && <Modal isOpen={isModalOpen}>{modalMessage}</Modal>}
    </div>
  );
}
