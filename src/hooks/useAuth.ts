import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as auth from '@/lib/api/services/auth';

export function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: auth.me,
    retry: false,
    enabled: !!localStorage.getItem('sb-token'),
  });

  const login = useMutation({
    mutationFn: auth.login,
    onSuccess: (response) => {
      queryClient.setQueryData(['user'], response.user);
      navigate('/');
    },
  });

  const register = useMutation({
    mutationFn: auth.register,
  });

  const logout = async () => {
    await auth.logout();
    queryClient.setQueryData(['user'], null);
    localStorage.removeItem('sb-token');
    navigate('/login');
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}