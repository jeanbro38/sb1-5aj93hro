import React from 'react';
import { CreditCard, ToggleLeft, ToggleRight } from 'lucide-react';
import type { PaymentGateway } from '@/types/admin';

interface PaymentGatewayCardProps {
  gateway: PaymentGateway;
  onToggle: () => void;
  onConfigure: () => void;
}

export default function PaymentGatewayCard({ gateway, onToggle, onConfigure }: PaymentGatewayCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <CreditCard className={`w-8 h-8 ${
            gateway.type === 'stripe' ? 'text-purple-500' : 'text-blue-500'
          }`} />
          <div>
            <h3 className="text-lg font-medium">{gateway.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{gateway.type}</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            gateway.isActive ? 'bg-green-500' : 'bg-gray-200'
          }`}
        >
          {gateway.isActive ? (
            <ToggleRight className="w-4 h-4 text-white" />
          ) : (
            <ToggleLeft className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      <button
        onClick={onConfigure}
        className="w-full px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100"
      >
        Configure Settings
      </button>
    </div>
  );
}