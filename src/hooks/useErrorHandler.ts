import { ApiException } from '@/lib/api';

export function useErrorHandler() {
  const handleError = (error: unknown) => {
    if (error instanceof ApiException) {
      // Handle API errors
      switch (error.status) {
        case 401:
          // Handle unauthorized
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        default:
          // Handle other errors
          break;
      }
      return error.error.message;
    }
    
    if (error instanceof Error) {
      return error.message;
    }
    
    return 'An unexpected error occurred';
  };

  return { handleError };
}