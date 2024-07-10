import axios from 'axios';

//baseURL 여러개 존재
export const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/2-정현진/',
});

// axios 인스턴스를 생성하고, 이를 통해 인증이 필요한 HTTP 요청 보낼때 사용
export const authInstance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/2-정현진/',
  headers: {
    // 요청 시 사용되는 HTTP 헤더를 설정
    Authorization:
      // ⬇️ 이 조건문은 코드가 브라우저 환경에서 실행 중인지 확인합니다. 브라우저 환경에서는 localStorage를 사용할 수 있지만, 서버 사이드 렌더링(SSR) 환경에서는 사용할 수 없기 때문에 이를 구분하기 위한 것입니다.
      typeof window !== 'undefined'
        ? `Bearer ${localStorage.getItem('accessToken')}`
        : '',
    //Bearer 토큰 방식을 사용 브라우저의 localStorage에서 저장된 accessToken을 가져옵니다.
  },
});
