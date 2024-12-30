import React from 'react';

interface StatusBadgeProps {
  status: 'running' | 'stopped' | 'error';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colors = {
    running: 'bg-green-100 text-green-800',
    stopped: 'bg-red-100 text-red-800',
    error: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span className={`px-2 py-1 text-sm rounded ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}