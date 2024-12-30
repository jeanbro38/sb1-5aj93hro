import { AxiosError } from 'axios';
import { ApiException, ApiError } from '../types/error';

export function errorInterceptor(error: AxiosError) {
  if (error.response) {
    const apiError: ApiError = {
      message: error.response.data?.message || 'An unexpected error occurred',
      code: error.response.data?.code,
      status: error.response.status
    };
    throw new ApiException(apiError, error.response.status);
  }
  
  throw error;
}