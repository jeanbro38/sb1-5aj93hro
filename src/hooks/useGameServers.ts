import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { games } from '@/lib/api';

export function useGameServers() {
  const queryClient = useQueryClient();

  const { data: gameServers, isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: () => games.list().then(res => res.data),
  });

  const create = useMutation({
    mutationFn: (data: { game: string; slots: number }) => games.create(data.game, data.slots),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });

  const control = useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'start' | 'stop' | 'reboot' }) =>
      games.control(id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });

  const getPanel = useMutation({
    mutationFn: (id: string) => games.getPanelUrl(id),
    onSuccess: (response) => {
      window.open(response.data.url, '_blank');
    },
  });

  return {
    gameServers,
    isLoading,
    create,
    control,
    getPanel,
  };
}