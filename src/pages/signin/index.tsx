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
import BaseButton from '@components/common/BaseButton';
import AuthInput from '@/components/common/Input/AuthInput';

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
    try {
      const response = await PostAuthSignIn(data);
      setIsModalOpen(false);
      const token = response.accessToken;
      localStorage.setItem('token', token);
      navigate('/mydashboard');
    } catch (error) {
      if (error instanceof AxiosError) {
        const loginFailureMessage = error.response?.data.message;
        setIsModalOpen(true);
        setModalMessage(loginFailureMessage);
      }
    }
  };

  return (
    <div className={cx('bg')}>
      <main className={cx('main')}>
        <div className={cx('mainTop')}>
          <div className={cx('imgWrapper')}>
            <Logo className={cx('logoImg')} />
          </div>
          <p className={cx('mainTopText')}>오늘도 만나서 반가워요!</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            className={`${cx('formLabel')} ${cx('formLabelEmail')}`}
            htmlFor='email'
          >
            이메일
          </label>
          <AuthInput
            id='email'
            placeholder='이메일을 입력해 주세요'
            type='text'
            trigger={trigger}
            clearErrors={clearErrors}
            register={register}
            name='email'
            errorMessage={errors.email?.message}
          />
          <label className={cx('formLabel')}>비밀번호</label>
          <AuthInput
            id='password'
            placeholder='8자 이상 입력해 주세요'
            type='password'
            trigger={trigger}
            clearErrors={clearErrors}
            register={register}
            name='password'
            errorMessage={errors.password?.message}
          />
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
      {isModalOpen && (
        <Modal isOpen={isModalOpen} size='alert'>
          {modalMessage}
          <BaseButton text='확인' size='lg' type='button' />
        </Modal>
      )}
    </div>
  );
}
