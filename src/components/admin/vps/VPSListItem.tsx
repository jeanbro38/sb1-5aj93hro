import React from 'react';
import { Edit, Trash2, Power } from 'lucide-react';
import VPSStatusBadge from './VPSStatusBadge';
import type { VPSService } from '@/types';

interface VPSListItemProps {
  vps: VPSService;
  onEdit: (vps: VPSService) => void;
  onDelete: (id: string) => void;
  onControl: (id: string, action: 'start' | 'stop') => void;
}

export default function VPSListItem({ vps, onEdit, onDelete, onControl }: VPSListItemProps) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">VPS #{vps.id}</div>
        <div className="text-sm text-gray-500">{vps.ipAddress}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          CPU: {vps.specs.cpu} cores<br />
          RAM: {vps.specs.ram}GB<br />
          Storage: {vps.specs.storage}GB
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <VPSStatusBadge status={vps.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => onControl(vps.id, vps.status === 'running' ? 'stop' : 'start')}
            className="text-blue-600 hover:text-blue-900"
          >
            <Power className="w-5 h-5" />
          </button>
          <button
            onClick={() => onEdit(vps)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(vps.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}