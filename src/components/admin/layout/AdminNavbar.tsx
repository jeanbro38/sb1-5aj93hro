import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminNavbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-700">Admin Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Settings className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              <span className="ml-2 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                Admin
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}