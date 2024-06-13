import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import Logo from '@/assets/svgs/logo.svg?react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { validationSchema } from '@hooks/validationSchema';
import styled from './signup.module.scss';
import { useEffect, useRef } from 'react';

//@TODO:
//1. react-hook-form 변경 ✅
//2. UI 작업 ✅
//3.기본 텍스트 1.6rem 설정하기✅
//4. 유효성검사 동적으로 반응할수 있도록 작업하기
//5. 기능 넣기
//6. 반응형 작업

//추가작업
//input 공동 컴포 만들기

interface Inputs {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export default function index() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const emailRef = useRef<HTMLInputElement | null>(null);
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  useEffect(() => {
    if (errors.email) {
      emailRef.current?.focus();
    } else if (errors.nickname) {
      nicknameRef.current?.focus();
    } else if (errors.password) {
      passwordRef.current?.focus();
    } else if (errors.passwordConfirm) {
      passwordConfirmRef.current?.focus();
    }
  }, [errors]);

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
            ref={emailRef}
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
            ref={nicknameRef}
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
            ref={passwordRef}
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
            ref={passwordConfirmRef}
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
            />
            <label htmlFor='checkbox'>이용약관에 동의합니다.</label>
          </div>
          <button className={styled.submitButton} disabled={isSubmitting}>
            가입하기
          </button>
        </form>
        <div className={styled.goSignUpContent}>
          <p className={styled.isSignUp}>이미 가입하셨나요?</p>
          <Link to='/signin'>로그인하기</Link>
        </div>
      </main>
    </div>
  );
}
