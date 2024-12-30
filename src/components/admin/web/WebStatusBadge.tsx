import React from 'react';

interface WebStatusBadgeProps {
  type: 'cpanel' | 'plesk';
}

export default function WebStatusBadge({ type }: WebStatusBadgeProps) {
  const colors = {
    cpanel: 'bg-orange-100 text-orange-800',
    plesk: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[type]}`}>
      {type.toUpperCase()}
    </span>
  );
}