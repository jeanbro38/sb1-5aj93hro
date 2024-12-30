import React from 'react';
import { MessageSquare } from 'lucide-react';
import type { Ticket } from '@/types/admin';

interface TicketListProps {
  tickets: Ticket[];
  onSelect: (ticket: Ticket) => void;
}

export default function TicketList({ tickets, onSelect }: TicketListProps) {
  return (
    <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          onClick={() => onSelect(ticket)}
          className="p-4 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-gray-900">{ticket.subject}</h3>
              <p className="text-sm text-gray-500">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                ticket.status === 'open' ? 'bg-green-100 text-green-800' :
                ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {ticket.status}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {ticket.priority}
              </span>
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">{ticket.messages.length}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}