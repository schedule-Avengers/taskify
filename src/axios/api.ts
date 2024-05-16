import { instance as axios } from './axios';
import {
  PostAuthLoginProps,
  PostCardProps,
  getCardProps,
  putAuthPasswordProps,
} from '@/types/types';

//put/post 뒤에 type 정의 필요

//email,password 받아서
export async function postAuthLogin({ email, password }: PostAuthLoginProps) {
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
export async function postCard({ cardItem }: PostCardProps) {
  const res = await axios.post('cards', cardItem);
  return res.status;
}

//카드목록조회
export async function getCard({ size, cursorId, columnId }: getCardProps) {
  const cursorIdQuery = cursorId ? `&cursorId=${cursorId} ` : '';
  const res = await axios.get(
    `/cards?=${size}${cursorIdQuery}&columnId=${columnId}`,
  );
  return res;
}
