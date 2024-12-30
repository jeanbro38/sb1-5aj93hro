export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export class ApiException extends Error {
  constructor(
    public error: ApiError,
    public status: number
  ) {
    super(error.message);
    this.name = 'ApiException';
  }
}