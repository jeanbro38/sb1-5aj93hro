import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vps } from '@/lib/api';
import { handleApiError } from '@/utils/api';

export function useVPS() {
  const queryClient = useQueryClient();

  const { data: vpsList, isLoading } = useQuery({
    queryKey: ['vps'],
    queryFn: () => vps.list().then(res => res.data),
  });

  const control = useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'start' | 'stop' | 'reboot' | 'reinstall' }) =>
      vps.control(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vps'] });
    },
    onError: (error) => {
      throw new Error(handleApiError(error));
    },
  });

  const snapshot = useMutation({
    mutationFn: vps.snapshot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vps'] });
    },
    onError: (error) => {
      throw new Error(handleApiError(error));
    },
  });

  const getVnc = useMutation({
    mutationFn: vps.getVnc,
    onError: (error) => {
      throw new Error(handleApiError(error));
    },
  });

  return {
    vpsList,
    isLoading,
    control,
    snapshot,
    getVnc,
  };
}