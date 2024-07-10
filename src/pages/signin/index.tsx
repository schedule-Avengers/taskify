import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { signinValidationSchema } from '@hooks/validationSchema';
import classNames from 'classnames/bind';
import styles from './signin.module.scss';
import Logo from '@/assets/svgs/logo.svg?react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { PostAuthSignIn } from '@axios/api';
import Modal from '@/components/common/Modal/index';
import { AxiosError } from 'axios';

const cx = classNames.bind(styles);

interface Inputs {
  email: string;
  password: string;
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
  } = useForm({
    resolver: yupResolver(signinValidationSchema),
  });

  useEffect(() => {
    setIsFormValid(isValid);
  }, [isValid]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // 사용자가 폼을 제출하면 데이터를 받아서
    try {
      const response = await PostAuthSignIn(data);
      //post때 보내주겠다.
      navigate('/');
      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        const loginFailurMessage = error.response?.data.message;
        setIsModalOpen(true);
        setModalMessage(loginFailurMessage);
      }
    }
  };

  return (
    <div className={cx('bg')}>
      <main className={cx('main')}>
        <div className={cx('mainTop')}>
          <Logo className={cx('logoImg')} />
          <p className={cx('mainTopText')}>오늘도 만나서 반가워요!</p>
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
          <button
            type='submit'
            className={`${cx('submitButton')} ${isFormValid ? '' : cx('disabled')}`}
            disabled={!isFormValid || isSubmitting}
          >
            가입하기
          </button>
        </form>
        <div className={cx('goSignUpContent')}>
          <p className={cx('isUser')}>회원이 아니신가요?</p>
          <Link to='/signup' className={cx('goSignup')}>
            회원가입하기
          </Link>
        </div>
      </main>
      {isModalOpen && <Modal isOpen={isModalOpen}>{modalMessage}</Modal>}
    </div>
  );
}
