import React from 'react';
import { Mail, AlertCircle } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onResend: () => void;
  isResending: boolean;
}

export default function EmailVerification({ email, onResend, isResending }: EmailVerificationProps) {
  return (
    <div className="rounded-lg bg-blue-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <Mail className="h-5 w-5 text-blue-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            Verify your email address
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              We've sent a verification email to <strong>{email}</strong>.
              Please check your inbox and click the verification link to activate your account.
            </p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={onResend}
              disabled={isResending}
              className="text-sm font-medium text-blue-800 hover:text-blue-700 disabled:opacity-50"
            >
              {isResending ? 'Sending...' : 'Resend verification email'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}