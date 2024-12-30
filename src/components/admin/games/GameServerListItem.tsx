import React from 'react';
import { Edit, Trash2, Power, ExternalLink } from 'lucide-react';
import GameServerStatusBadge from './GameServerStatusBadge';
import type { GameService } from '@/types';

interface GameServerListItemProps {
  server: GameService;
  onEdit: (server: GameService) => void;
  onDelete: (id: string) => void;
  onControl: (id: string, action: 'start' | 'stop') => void;
  onOpenPanel: (id: string) => void;
}

export default function GameServerListItem({
  server,
  onEdit,
  onDelete,
  onControl,
  onOpenPanel,
}: GameServerListItemProps) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{server.game}</div>
        <div className="text-sm text-gray-500">Server #{server.id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          Player Slots: {server.slots}
        </div>
        <div className="text-sm text-gray-500">
          Created: {new Date(server.created).toLocaleDateString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <GameServerStatusBadge status={server.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => onControl(server.id, server.status === 'running' ? 'stop' : 'start')}
            className="text-blue-600 hover:text-blue-900"
            title={server.status === 'running' ? 'Stop Server' : 'Start Server'}
          >
            <Power className="w-5 h-5" />
          </button>
          <button
            onClick={() => onOpenPanel(server.id)}
            className="text-gray-600 hover:text-gray-900"
            title="Open Game Panel"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
          <button
            onClick={() => onEdit(server)}
            className="text-gray-600 hover:text-gray-900"
            title="Edit Server"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(server.id)}
            className="text-red-600 hover:text-red-900"
            title="Delete Server"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}