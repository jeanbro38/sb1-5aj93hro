import React from 'react';
import { Plus } from 'lucide-react';
import WebHostingCard from '@/components/web/WebHostingCard';
import NewWebHostingModal from '@/components/web/NewWebHostingModal';
import { useWebHosting } from '@/hooks/useWebHosting';
import { useModal } from '@/hooks/useModal';

export default function WebHostingPage() {
  const { isOpen, open, close } = useModal();
  const { webServices, isLoading, getPanel, getStats } = useWebHosting();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Web Hosting</h2>
        <button
          onClick={open}
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Website
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {webServices?.map((service) => (
          <WebHostingCard
            key={service.id}
            service={service}
            onOpenPanel={() => getPanel.mutate(service.id)}
            stats={getStats.data?.[service.id]}
          />
        ))}
      </div>

      <NewWebHostingModal isOpen={isOpen} onClose={close} />
    </div>
  );
}