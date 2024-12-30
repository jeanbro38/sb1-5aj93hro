import React, { useState } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import TicketList from '@/components/admin/tickets/TicketList';
import TicketDetails from '@/components/admin/tickets/TicketDetails';
import type { Ticket } from '@/types/admin';

export default function TicketsPage() {
  const { tickets, ticketsLoading, respondToTicket } = useAdmin();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  if (ticketsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Support Tickets</h2>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-5">
          <TicketList
            tickets={tickets || []}
            onSelect={setSelectedTicket}
          />
        </div>
        <div className="col-span-7">
          {selectedTicket ? (
            <TicketDetails
              ticket={selectedTicket}
              onRespond={(message) => {
                respondToTicket.mutate({
                  ticketId: selectedTicket.id,
                  message
                });
              }}
              onUpdateStatus={(status) => {
                // Handle status update
              }}
            />
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              Select a ticket to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}