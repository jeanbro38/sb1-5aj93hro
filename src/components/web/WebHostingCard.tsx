import React from 'react';
import { Globe, ExternalLink, HardDrive, Activity } from 'lucide-react';
import { formatBytes } from '@/utils/format';
import type { WebService } from '@/types';

interface WebHostingCardProps {
  service: WebService;
  stats?: {
    diskUsage: number;
    bandwidth: number;
  };
  onOpenPanel: () => void;
}

export default function WebHostingCard({ service, stats, onOpenPanel }: WebHostingCardProps) {
  const diskUsagePercent = (stats?.diskUsage || 0) / service.storage.total * 100;
  const bandwidthPercent = (stats?.bandwidth || 0) / service.bandwidth.total * 100;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Globe className="w-5 h-5 mr-2 text-blue-600" />
          <h3 className="text-lg font-medium">{service.domain}</h3>
        </div>
        <span className="px-2 py-1 text-sm text-blue-800 bg-blue-100 rounded">
          {service.type}
        </span>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center">
              <HardDrive className="w-4 h-4 mr-1" /> Disk Usage
            </span>
            <span>{formatBytes(stats?.diskUsage || 0)} / {formatBytes(service.storage.total)}</span>
          </div>
          <div className="w-full h-2 mt-1 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{ width: `${diskUsagePercent}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center">
              <Activity className="w-4 h-4 mr-1" /> Bandwidth
            </span>
            <span>{formatBytes(stats?.bandwidth || 0)} / {formatBytes(service.bandwidth.total)}</span>
          </div>
          <div className="w-full h-2 mt-1 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{ width: `${bandwidthPercent}%` }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={onOpenPanel}
        className="flex items-center justify-center w-full px-4 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        <ExternalLink className="w-4 h-4 mr-2" />
        Open Control Panel
      </button>
    </div>
  );
}