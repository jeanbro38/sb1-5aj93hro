export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  requirements: Array<{ met: boolean; message: string }>;
} {
  const requirements = [
    {
      met: password.length >= 8,
      message: 'At least 8 characters',
    },
    {
      met: /[A-Z]/.test(password),
      message: 'Contains uppercase letter',
    },
    {
      met: /[a-z]/.test(password),
      message: 'Contains lowercase letter',
    },
    {
      met: /[0-9]/.test(password),
      message: 'Contains number',
    },
  ];

  return {
    isValid: requirements.every(req => req.met),
    requirements,
  };
}