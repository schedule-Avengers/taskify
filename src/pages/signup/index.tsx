import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '@hooks/validationSchema';
import { postAuthSignUp } from '@/axios/api';
import styled from '@/pages/signup/signup.module.scss';
import Logo from '@/assets/svgs/logo.svg?react';
import Modal from '@/components/common/Modal/index';

//input에서 focus 빼면 유효성 검사 시작 input에 다시 focus 두면 에러메세지 없어진다.
//@TODO:
//유효성 검사에 성공하면 button able✅
//email 유저가 있는지 확인하기
//6. 반응형 작업

//로그인페이지 만들어주기 -api 연결

//추가작업
//로딩 처리 해주기
//input 공동 컴포 만들기
//axios에 대한 공부
//회원가입 여러 방식에 대한 공부

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
    //폼의 유효성 검사를 나타내는 속성
    trigger,
    clearErrors,
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
    // mode: 'onBlur',
  });

  useEffect(() => {
    setIsFormValid(isValid);
  }, [isValid]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      const response = await postAuthSignUp(data);
      setModalMessage('회원가입에 성공했습니다!');
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/signin');
      }, 3000);
    } catch (error) {
      console.error('회원가입 실패:', error);
      setModalMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
      setIsModalOpen(true);
    }
  };

  return (
    <div className={styled.bg}>
      <main className={styled.main}>
        <div className={styled.mainTop}>
          <Logo className={styled.logoImg} />
          <p className={styled.mainTopText}>첫 방문을 환영합니다!</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            className={`${styled.formLabel} ${styled.formLabelEmail}`}
            htmlFor='email'
          >
            이메일
          </label>
          <input
            id='email'
            placeholder='이메일을 입력해주세요'
            type='text'
            className={`${styled.formInput} ${errors.email ? styled.error : ''}`}
            {...register('email')}
            onBlur={() => trigger('email')}
            onFocus={() => clearErrors('email')}
          />
          {errors.email && (
            <span className={styled.errorMessage}>{errors.email.message}</span>
          )}
          <label className={styled.formLabel} htmlFor='nickname'>
            닉네임
          </label>
          <input
            id='nickname'
            placeholder='닉네임을 입력해 주세요'
            type='text'
            className={`${styled.formInput} ${errors.nickname ? styled.error : ''}`}
            {...register('nickname')}
            onBlur={() => trigger('nickname')}
            onFocus={() => clearErrors('nickname')}
          />
          {errors.nickname && (
            <span className={styled.errorMessage}>
              {errors.nickname.message}
            </span>
          )}
          <label className={styled.formLabel}>비밀번호</label>
          <input
            placeholder='8자 이상 입력해 주세요'
            type='password'
            className={`${styled.formInput} ${errors.password ? styled.error : ''}`}
            {...register('password')}
            onBlur={() => trigger('password')}
            onFocus={() => clearErrors('password')}
          />
          {errors.password && (
            <span className={styled.errorMessage}>
              {errors.password.message}
            </span>
          )}
          <label className={styled.formLabel}>비밀번호 확인</label>
          <input
            placeholder='비밀번호를 한번 더 입력해 주세요'
            type='password'
            className={`${styled.formInput} ${errors.passwordConfirm ? styled.error : ''}`}
            {...register('passwordConfirm')}
            onBlur={() => trigger('passwordConfirm')}
            onFocus={() => clearErrors('passwordConfirm')}
          />
          {errors.passwordConfirm && (
            <span className={styled.errorMessage}>
              {errors.passwordConfirm.message}
            </span>
          )}
          <div className={styled.agreeContent}>
            <input
              type='checkbox'
              id='checkbox'
              className={styled.agreeCheckbox}
              {...register('checkbox')}
              onBlur={() => trigger('checkbox')}
              onFocus={() => clearErrors('checkbox')}
            />
            <label htmlFor='checkbox'>이용약관에 동의합니다.</label>
          </div>
          {/* {errors.checkbox && (
            <span className={styled.errorMessage}>
              {errors.checkbox.message}
            </span>
          )} */}
          <button
            type='submit'
            className={`${styled.submitButton} ${isFormValid ? '' : styled.disabled}`}
            disabled={isFormValid || isSubmitting}
            // 둘다 false가 되야지만 disabled가 되지 않는거맞아?
          >
            가입하기
          </button>
        </form>
        <div className={styled.goSignUpContent}>
          <p className={styled.isSignUp}>이미 가입하셨나요?</p>
          <Link to='/signin'>로그인하기</Link>
        </div>
      </main>
      {isModalOpen && <Modal isOpen={isModalOpen}>{modalMessage}</Modal>}
    </div>
  );
}
