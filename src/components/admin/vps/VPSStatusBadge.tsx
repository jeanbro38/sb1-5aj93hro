import React from 'react';

interface VPSStatusBadgeProps {
  status: 'running' | 'stopped' | 'error';
}

export default function VPSStatusBadge({ status }: VPSStatusBadgeProps) {
  const colors = {
    running: 'bg-green-100 text-green-800',
    stopped: 'bg-red-100 text-red-800',
    error: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}