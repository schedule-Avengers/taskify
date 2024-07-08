import { instance as axios } from './axios';
import {
  postAuthSignUpProps,
  PostAuthSignInProps,
  // PostCardProps,
  getCardProps,
  putAuthPasswordProps,
  UserInfo,
} from '@/types/types';

//------------ 회원가입 로그인 ---------------
export async function postAuthSignUp(userInfo: postAuthSignUpProps) {
  const res = await axios.post<UserInfo>(`/users`, userInfo);
  //UserInfo 서버로부터 반환되는 데이터의 구조를 명확
  return res.data;
}

//email,password 받아서
export async function PostAuthSignIn({ email, password }: PostAuthSignInProps) {
  //params로
  const res = await axios.post('auth/login', {
    email,
    password,
  });
  return res;
}

export async function putAuthPassword({
  password,
  newPassword,
}: putAuthPasswordProps) {
  const res = await axios.put('auth/password', {
    password,
    newPassword,
  });
  return res.status;
}

//------------ card ---------------
//카드생성
// export async function postCard({ cardItem }: PostCardProps) {
//   const res = await axios.post('cards', cardItem);
//   return res.status;
// }

//카드목록조회
export async function getCard({ size, cursorId, columnId }: getCardProps) {
  const cursorIdQuery = cursorId ? `&cursorId=${cursorId} ` : '';
  const res = await axios.get(
    `/cards?=${size}${cursorIdQuery}&columnId=${columnId}`,
  );
  return res;
}
