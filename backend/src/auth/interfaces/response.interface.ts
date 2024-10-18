export interface IResponse {
  success: boolean;
  error?: Error | null;
  data?: Record<string, any>[];
}