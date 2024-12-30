import React from 'react';
import { Power, RefreshCw, ExternalLink } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import type { GameService } from '@/types';

interface GameServerCardProps {
  server: GameService;
  onControl: (action: 'start' | 'stop' | 'reboot') => void;
  onOpenPanel: () => void;
}

export default function GameServerCard({ server, onControl, onOpenPanel }: GameServerCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">{server.game}</h3>
        <StatusBadge status={server.status} />
      </div>
      
      <div className="mt-4 space-y-2">
        <p>Player Slots: {server.slots}</p>
        <p>Created: {new Date(server.created).toLocaleDateString()}</p>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={() => onControl(server.status === 'running' ? 'stop' : 'start')}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          <Power className="w-4 h-4 mr-2" />
          {server.status === 'running' ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={() => onControl('reboot')}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reboot
        </button>
        <button
          onClick={onOpenPanel}
          className="flex items-center px-3 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Open Panel
        </button>
      </div>
    </div>
  );
}