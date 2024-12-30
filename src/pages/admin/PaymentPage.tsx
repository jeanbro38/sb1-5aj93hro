import React, { useState } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import PaymentGatewayCard from '@/components/admin/payment/PaymentGatewayCard';
import Modal from '@/components/shared/Modal';
import type { PaymentGateway } from '@/types/admin';

export default function PaymentPage() {
  const { paymentGateways, paymentGatewaysLoading, updatePaymentGateway } = useAdmin();
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null);
  const [isConfiguring, setIsConfiguring] = useState(false);

  if (paymentGatewaysLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payment Gateway Configuration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentGateways?.map((gateway) => (
          <PaymentGatewayCard
            key={gateway.id}
            gateway={gateway}
            onToggle={() => {
              // Handle gateway toggle
            }}
            onConfigure={() => {
              setSelectedGateway(gateway);
              setIsConfiguring(true);
            }}
          />
        ))}
      </div>

      <Modal
        isOpen={isConfiguring}
        onClose={() => setIsConfiguring(false)}
        title={`Configure ${selectedGateway?.name}`}
      >
        {selectedGateway && (
          <form className="space-y-4">
            {Object.entries(selectedGateway.config).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">
                  {key.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    // Handle input change
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            ))}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsConfiguring(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save Configuration
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}