import {
  CallHandler,
  ExecutionContext,
  HttpException, // Ensure this is imported
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs'; // No need for throwError if using 'of' to return response

import { errorResponse, successResponse } from '../helpers/api-response.helper';
import { ApiResponse } from '../interfaces/api-response.interface';

// Define the expected shape of the object returned by HttpException.getResponse()
interface HttpExceptionResponse {
  statusCode: number;
  message: string | string[]; // Message can be a string or array of strings
  error: string;
}

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  private readonly _logger = new Logger(ApiResponseInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      // Map successful responses to the success format
      map((data) => successResponse(Array.isArray(data) ? data : [data])),

      // Catch errors and map them to the error format
      catchError((error) => {
        // Log the actual error for debugging server-side
        this._logger.error('API Error:', error.stack || error);

        let [status, code, detail] = [
          500, // Default status
          'INTERNAL_SERVER_ERROR', // Default code
          'An unexpected error occurred', // Default detail
        ];

        // Check if it's a known HttpException
        if (error instanceof HttpException) {
          status = error.getStatus();
          const response: string | object = error.getResponse();

          if (typeof response === 'string') {
            // If response is a simple string
            detail = response;
            // We might not have a specific code in this case, use the default
            code = `HTTP_${status}`; // Or some other convention if needed
          } else if (typeof response === 'object' && response !== null) {
            // If response is an object, assert its type to access properties safely
            const errorResponseObj = response as HttpExceptionResponse;

            // Use optional chaining and nullish coalescing for safety
            // message could be string or string[], join if array
            detail = Array.isArray(errorResponseObj.message)
                ? errorResponseObj.message.join(', ') // Join array messages
                : errorResponseObj.message // Use string message or undefined
                || detail; // Fallback to default detail

            code = errorResponseObj.error // Use error code or undefined
                || `HTTP_${status}` // Fallback to HTTP status derived code
                || code; // Fallback to default code
          }
        } else {
           // Handle non-HttpException errors (e.g., database errors, code errors)
           // You might want different logging or error details here
           // For now, it falls back to the default 500 Internal Server Error
        }

        // Return the error response wrapped in an observable 'of'
        // This prevents re-throwing the error and allows the interceptor
        // to return a normal Observable<ApiResponse> with an error payload.
        return of(errorResponse(code, detail, status));
      }),
    );
  }
}