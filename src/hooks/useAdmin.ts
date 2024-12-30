import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { admin } from '@/lib/api';
import { handleApiError } from '@/utils/api';

export function useAdmin() {
  const queryClient = useQueryClient();

  // Servers
  const { data: servers, isLoading: serversLoading } = useQuery({
    queryKey: ['admin', 'servers'],
    queryFn: admin.listServers,
  });

  const createServer = useMutation({
    mutationFn: admin.createServer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'servers'] }),
    onError: (error) => { throw new Error(handleApiError(error)); },
  });

  // Users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: admin.listUsers,
  });

  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => admin.updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'users'] }),
    onError: (error) => { throw new Error(handleApiError(error)); },
  });

  // Tickets
  const { data: tickets, isLoading: ticketsLoading } = useQuery({
    queryKey: ['admin', 'tickets'],
    queryFn: admin.listTickets,
  });

  const respondToTicket = useMutation({
    mutationFn: ({ ticketId, message }: { ticketId: string; message: string }) =>
      admin.respondToTicket(ticketId, message),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'tickets'] }),
    onError: (error) => { throw new Error(handleApiError(error)); },
  });

  // Payment Gateways
  const { data: paymentGateways, isLoading: paymentGatewaysLoading } = useQuery({
    queryKey: ['admin', 'payment-gateways'],
    queryFn: admin.listPaymentGateways,
  });

  const updatePaymentGateway = useMutation({
    mutationFn: ({ id, config }: { id: string; config: any }) =>
      admin.updatePaymentGateway(id, config),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'payment-gateways'] }),
    onError: (error) => { throw new Error(handleApiError(error)); },
  });

  return {
    // Servers
    servers,
    serversLoading,
    createServer,
    
    // Users
    users,
    usersLoading,
    updateUser,
    
    // Tickets
    tickets,
    ticketsLoading,
    respondToTicket,
    
    // Payment Gateways
    paymentGateways,
    paymentGatewaysLoading,
    updatePaymentGateway,
  };
}