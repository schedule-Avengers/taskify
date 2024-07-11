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

  // useEffect를 사용하여 컴포넌트가 마운트되거나 특정 상태가 변경될 때마다 로그인 상태를 확인하고, 사용자가 이미 로그인된 상태라면 대시보드로 리다이렉트합니다.
  // 이는 사용자가 로그인 페이지에 직접 접근할 때 자동으로 대시보드로 이동하도록 합니다.

  // useEffect(() => {
  //   const accessToken = localStorage.getItem('token');
  //   if (accessToken) {
  //     navigate('/mydashboard');
  //   }
  // }, [loginError]);

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

//로그인 성공시 true false를 보내고 토큰이 유효한지 확인??

// 프론트엔드가 토큰을 받아 로컬 스토리지 또는 쿠키에 저장합니다

// (추후)프론트엔드가 저장된 토큰을 사용하여 인증된 요청을 보냅니다.

// const instance = axios.create({
//   baseURL: 'http://localhost:3000',
//   headers: { 'Authorization': `Bearer ${token}` }
// });

// // 예시: 인증된 사용자 정보 가져오기
// instance.get('/api/userinfo')
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching user info', error);
//   });

// 백엔드가 요청을 받을 때 토큰을 확인하여 사용자 인증 상태를 관리합니다.

// function useAuth() {
//   const history = useHistory();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       history.push('/login');
//     }

//     const checkTokenValidity = () => {
//       // 토큰 유효성 검사 (옵션으로 서버에서 토큰을 검증할 수 있습니다)
//       const decodedToken = jwt.decode(token);
//       if (decodedToken.exp < Date.now() / 1000) {
//         alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
//         localStorage.removeItem('token');
//         history.push('/login');
//       }
//     };

//     checkTokenValidity();
//   }, [history]);

//   return null;
// }
