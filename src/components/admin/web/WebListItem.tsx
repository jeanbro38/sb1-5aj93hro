import React from 'react';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import WebStatusBadge from './WebStatusBadge';
import { formatBytes } from '@/utils/format';
import type { WebService } from '@/types';

interface WebListItemProps {
  website: WebService;
  onEdit: (website: WebService) => void;
  onDelete: (id: string) => void;
  onOpenPanel: (id: string) => void;
}

export default function WebListItem({
  website,
  onEdit,
  onDelete,
  onOpenPanel,
}: WebListItemProps) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{website.domain}</div>
        <div className="text-sm text-gray-500">Created: {new Date(website.created).toLocaleDateString()}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          Storage: {formatBytes(website.storage.used)} / {formatBytes(website.storage.total)}
        </div>
        <div className="text-sm text-gray-900">
          Bandwidth: {formatBytes(website.bandwidth.used)} / {formatBytes(website.bandwidth.total)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <WebStatusBadge type={website.type} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => onOpenPanel(website.id)}
            className="text-gray-600 hover:text-gray-900"
            title="Open Control Panel"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
          <button
            onClick={() => onEdit(website)}
            className="text-gray-600 hover:text-gray-900"
            title="Edit Website"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(website.id)}
            className="text-red-600 hover:text-red-900"
            title="Delete Website"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}