import React from 'react';
import { Check, X } from 'lucide-react';

interface Requirement {
  label: string;
  met: boolean;
}

interface PasswordStrengthIndicatorProps {
  password: string;
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const requirements: Requirement[] = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains number', met: /[0-9]/.test(password) },
  ];

  const strength = requirements.filter(req => req.met).length;
  const strengthPercentage = (strength / requirements.length) * 100;

  return (
    <div className="mt-2 space-y-2">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            strengthPercentage <= 25 ? 'bg-red-500' :
            strengthPercentage <= 50 ? 'bg-yellow-500' :
            strengthPercentage <= 75 ? 'bg-blue-500' :
            'bg-green-500'
          }`}
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>
      
      <ul className="space-y-1 text-sm">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <X className="w-4 h-4 text-red-500" />
            )}
            <span className={req.met ? 'text-green-700' : 'text-red-700'}>
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}