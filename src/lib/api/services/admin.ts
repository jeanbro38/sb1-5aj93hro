import api from '../config';
import type { AdminServer, Ticket, PaymentGateway } from '@/types/admin';
import type { User } from '@/types';

// Server Management
export async function listServers() {
  return api.get<AdminServer[]>('/admin/servers');
}

export async function createServer(data: Omit<AdminServer, 'id'>) {
  return api.post<AdminServer>('/admin/servers', data);
}

export async function updateServer(id: string, data: Partial<AdminServer>) {
  return api.put<AdminServer>(`/admin/servers/${id}`, data);
}

export async function deleteServer(id: string) {
  return api.delete(`/admin/servers/${id}`);
}

// User Management
export async function listUsers() {
  return api.get<User[]>('/admin/users');
}

export async function updateUser(id: string, data: Partial<User>) {
  return api.put<User>(`/admin/users/${id}`, data);
}

export async function resetUserPassword(id: string) {
  return api.post(`/admin/users/${id}/reset-password`);
}

export async function blockUser(id: string) {
  return api.post(`/admin/users/${id}/block`);
}

// Service Management
export async function listAllServices() {
  return api.get('/admin/services');
}

export async function manageService(id: string, action: string) {
  return api.post(`/admin/services/${id}/${action}`);
}

// Ticket System
export async function listTickets() {
  return api.get<Ticket[]>('/admin/tickets');
}

export async function respondToTicket(ticketId: string, message: string) {
  return api.post(`/admin/tickets/${ticketId}/respond`, { message });
}

export async function updateTicketStatus(ticketId: string, status: Ticket['status']) {
  return api.put(`/admin/tickets/${ticketId}/status`, { status });
}

// Payment Gateway
export async function listPaymentGateways() {
  return api.get<PaymentGateway[]>('/admin/payment-gateways');
}

export async function updatePaymentGateway(id: string, config: PaymentGateway['config']) {
  return api.put(`/admin/payment-gateways/${id}`, config);
}

export async function togglePaymentGateway(id: string) {
  return api.post(`/admin/payment-gateways/${id}/toggle`);
}