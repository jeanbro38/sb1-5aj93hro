import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Server,
  Users,
  TicketIcon,
  CreditCard,
  Settings,
  Monitor,
  GamepadIcon,
  Globe,
} from 'lucide-react';

const navigation = [
  { name: 'Servers', href: '/admin/servers', icon: Server },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Tickets', href: '/admin/tickets', icon: TicketIcon },
  { name: 'Payment Gateways', href: '/admin/payment', icon: CreditCard },
  { name: 'VPS', href: '/admin/vps', icon: Monitor },
  { name: 'Game Servers', href: '/admin/games', icon: GamepadIcon },
  { name: 'Web Hosting', href: '/admin/web', icon: Globe },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <nav className="flex flex-col p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}