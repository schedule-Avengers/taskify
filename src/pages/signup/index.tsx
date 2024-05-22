import { Link } from 'react-router-dom';
import Logo from '@/assets/svgs/logo.svg?react';

export default function index() {
  return (
    <div>
      <main>
        <div>
          <img />
          <Logo />
          <p>첫 방문을 환영합니다!</p>
        </div>
        <form>
          <label htmlFor='email'>이메일</label>
          <input id='email' placeholder='이메일을 입력해주세요' type='text' />
          <label htmlFor='nickname'>닉네임</label>
          <input
            id='nickname'
            placeholder='닉네임을 입력해 주세요'
            type='text'
          />
          <label>비밀번호</label>
          <input placeholder='8자 이상 입력해 주세요' type='password' />
          <label>비밀번호 확인</label>
          <input
            placeholder='비밀번호를 한번 더 입력해 주세요'
            type='password'
          />
          <input type='checkbox' id='checkbox' />
          <label htmlFor='checkbox'>이용약관에 동의합니다.</label>
          <button type='submit'>가입합니다.</button>
        </form>
        <div>
          <p>이미 가입하셨나요?</p>
          <Link to='/signin'>로그인하기</Link>
        </div>
      </main>
    </div>
  );
}
