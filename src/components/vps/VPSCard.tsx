import React from 'react';
import { Power, RefreshCw, Terminal, Camera } from 'lucide-react';
import type { VPSService } from '@/types';

interface VPSCardProps {
  vps: VPSService;
  onControl: (action: 'start' | 'stop' | 'reboot' | 'reinstall') => void;
  onSnapshot: () => void;
  onVNC: () => void;
}

export default function VPSCard({ vps, onControl, onSnapshot, onVNC }: VPSCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">VPS #{vps.id}</h3>
        <span className={`px-2 py-1 text-sm rounded ${
          vps.status === 'running' ? 'bg-green-100 text-green-800' :
          vps.status === 'stopped' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {vps.status}
        </span>
      </div>
      
      <div className="mt-4 space-y-2">
        <p>CPU: {vps.specs.cpu} cores</p>
        <p>RAM: {vps.specs.ram}GB</p>
        <p>Storage: {vps.specs.storage}GB</p>
        <p>IP: {vps.ipAddress}</p>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={() => onControl(vps.status === 'running' ? 'stop' : 'start')}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          <Power className="w-4 h-4 mr-2" />
          {vps.status === 'running' ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={() => onControl('reboot')}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reboot
        </button>
        <button
          onClick={onVNC}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          <Terminal className="w-4 h-4 mr-2" />
          VNC
        </button>
        <button
          onClick={onSnapshot}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          <Camera className="w-4 h-4 mr-2" />
          Snapshot
        </button>
      </div>
    </div>
  );
}