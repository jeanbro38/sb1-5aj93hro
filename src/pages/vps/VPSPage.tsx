import React from 'react';
import { Plus } from 'lucide-react';
import VPSCard from '@/components/vps/VPSCard';
import { useVPS } from '@/hooks/useVPS';

export default function VPSPage() {
  const { vpsList, isLoading, control, snapshot, getVnc } = useVPS();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">VPS Servers</h2>
        <button className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          New VPS
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vpsList?.map((vps) => (
          <VPSCard
            key={vps.id}
            vps={vps}
            onControl={(action) => control.mutate({ id: vps.id, action })}
            onSnapshot={() => snapshot.mutate(vps.id)}
            onVNC={() => getVnc.mutate(vps.id)}
          />
        ))}
      </div>
    </div>
  );
}