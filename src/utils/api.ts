import { ApiException } from '@/lib/api/types/error';

export function handleApiError(error: unknown): string {
  if (error instanceof ApiException) {
    return error.error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}