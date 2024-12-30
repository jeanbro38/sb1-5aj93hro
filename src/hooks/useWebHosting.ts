import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { web } from '@/lib/api';

export function useWebHosting() {
  const queryClient = useQueryClient();

  const { data: webServices, isLoading } = useQuery({
    queryKey: ['web'],
    queryFn: () => web.list().then(res => res.data),
  });

  const create = useMutation({
    mutationFn: (data: { type: 'cpanel' | 'plesk'; domain: string }) =>
      web.create(data.type, data.domain),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['web'] });
    },
  });

  const getPanel = useMutation({
    mutationFn: (id: string) => web.getPanelUrl(id),
    onSuccess: (response) => {
      window.open(response.data.url, '_blank');
    },
  });

  const getStats = useQuery({
    queryKey: ['web', 'stats'],
    queryFn: () => web.getStats(),
    refetchInterval: 60000, // Refresh every minute
  });

  return {
    webServices,
    isLoading,
    create,
    getPanel,
    getStats,
  };
}