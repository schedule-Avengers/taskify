import { authInstance } from '@/axios/axios';
import { putAuthPasswordProps, UpdateUserProps } from '@/types/types';

export const getUser = async () => {
  const res = await authInstance.get('/users/me');
  return res.data;
};

export const updateUser = async (userData: UpdateUserProps) => {
  const response = await authInstance.put(`/users/me`, userData);
  return response.data;
};

export const changePassword = async (passwordData: putAuthPasswordProps) => {
  const response = await authInstance.put(`/auth/password`, passwordData);
  return response.data;
};

export const uploadProfileImage = async (imageData: FormData) => {
  const response = await authInstance.post(`users/me/image`, imageData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
