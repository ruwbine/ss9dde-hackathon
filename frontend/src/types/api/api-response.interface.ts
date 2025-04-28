interface BaseAPIResponse {
    success: boolean;
    statusCode: number;
    timestamp: string;
    message?: string;
    metadata?: Record<string, any>;
  }
  export interface SuccessResponse<T> extends BaseAPIResponse {
    success: true;
    data: T[];
    errors?: never;
  }
  export interface ErrorResponse extends BaseAPIResponse {
    success: false;
    errors: { code: string; detail: string }[];
    data?: never;
  }
  export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
  