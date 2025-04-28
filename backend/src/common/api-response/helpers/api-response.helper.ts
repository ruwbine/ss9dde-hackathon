import {
  ErrorResponse,
  SuccessResponse,
} from '../interfaces/api-response.interface';

export function successResponse<T>(
  data: T[],
  message?: string,
  metadata?: Record<string, any>,
): SuccessResponse<T> {
  return {
    success: true,
    statusCode: 200, // можете передавать другой код, если нужно
    timestamp: new Date().toISOString(),
    data,
    message,
    metadata,
  };
}

export function errorResponse(
  code: string,
  detail: string,
  statusCode = 400,
  message?: string,
): ErrorResponse {
  return {
    success: false,
    statusCode,
    timestamp: new Date().toISOString(),
    errors: [{ code, detail }],
    message,
  };
}
