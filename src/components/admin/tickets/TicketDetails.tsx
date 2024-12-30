import React from 'react';
import { Send } from 'lucide-react';
import type { Ticket } from '@/types/admin';

interface TicketDetailsProps {
  ticket: Ticket;
  onRespond: (message: string) => void;
  onUpdateStatus: (status: Ticket['status']) => void;
}

export default function TicketDetails({ ticket, onRespond, onUpdateStatus }: TicketDetailsProps) {
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onRespond(message);
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{ticket.subject}</h3>
          <select
            value={ticket.status}
            onChange={(e) => onUpdateStatus(e.target.value as Ticket['status'])}
            className="rounded-md border-gray-300 text-sm"
          >
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {ticket.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-lg p-3 ${
              msg.isAdmin ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <p className="text-sm">{msg.message}</p>
              <span className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your response..."
            className="flex-1 rounded-md border-gray-300"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}