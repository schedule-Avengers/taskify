import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/,
      '올바른 이메일 형식을 입력하세요',
    )
    .required('이메일은 필수항목입니다.'),
  nickname: yup
    .string()
    .min(3, '닉네임은 3글자 이상이여야 합니다.')
    .max(10, '닉네임은 8글자 이하여야 합니다.')
    .matches(/^[a-z0-9]+$/, '닉네임은 알파벳 소문자와 숫자만 포함해야 합니다.')
    .required('닉네임은 필수항목입니다. '),
  password: yup
    .string()
    .min(8, '8자 이상의 비밀번호를 입력해 주세요')
    .max(20, '20자 이하의 비밀번호를 입력해 주세요')
    .matches(/[a-zA-Z]/, '비밀번호에는 1개 이상의 영어가 포함되어야 합니다.')
    .matches(/\d/, '비밀번호에는 1개 이상의 숫자가 포함되어야 합니다.')
    .matches(
      /[!@#$%^&*()_+]/,
      '비밀번호에는 1개 이상의 특수문자가 포함되어야 합니다.',
    )
    .required('비밀번호는 필수항목입니다.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 다시 입력해 주세요'),
});
