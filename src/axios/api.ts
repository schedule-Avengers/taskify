import { instance as axios } from './axios';

export async function postAuthLogin() {
  const res = await axios.post('auth/login');
  return res;
}
