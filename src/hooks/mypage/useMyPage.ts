import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  changePassword,
  getUser,
  updateUser,
  uploadProfileImage,
} from '@/api/mypage';
import { putAuthPasswordProps, UpdateUserProps } from '@/types/types';

export const useMyPage = {
  get: () =>
    useQuery({
      queryKey: ['user', 'userInfo'],
      queryFn: getUser,
    }),
  profileEdit: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (userData: UpdateUserProps) => updateUser(userData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
      },
    });
  },
  passwordChange: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (passwordData: putAuthPasswordProps) =>
        changePassword(passwordData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
      },
    });
  },
  profileImageUpload: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (imageData: FormData) => uploadProfileImage(imageData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
      },
    });
  },
};
