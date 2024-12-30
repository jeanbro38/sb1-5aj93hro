import React from 'react';
import { NavLink } from 'react-router-dom';
import { Server, GamepadIcon, Globe, CreditCard } from 'lucide-react';

const navigation = [
  { name: 'VPS Servers', href: '/vps', icon: Server },
  { name: 'Game Hosting', href: '/games', icon: GamepadIcon },
  { name: 'Web Hosting', href: '/web', icon: Globe },
  { name: 'Billing', href: '/billing', icon: CreditCard },
];

export default function Sidebar() {
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
                  ? 'bg-gray-100 text-gray-900'
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