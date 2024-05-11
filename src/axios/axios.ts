import axios from 'axios';

//baseURL 여러개 존재
export const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/2-정현진/',
});
