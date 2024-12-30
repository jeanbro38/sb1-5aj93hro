export interface AdminServer {
  id: string;
  type: 'plesk' | 'cpanel' | 'proxmox' | 'pterodactyl';
  name: string;
  url: string;
  apiKey: string;
  status: 'active' | 'inactive';
}

export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  status: 'open' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  createdAt: Date;
  isAdmin: boolean;
}

export interface PaymentGateway {
  id: string;
  name: string;
  type: 'stripe' | 'paypal';
  isActive: boolean;
  config: Record<string, string>;
}