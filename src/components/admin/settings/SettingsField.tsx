import React from 'react';

interface SettingsFieldProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

export default function SettingsField({ label, description, children }: SettingsFieldProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      {children}
    </div>
  );
}