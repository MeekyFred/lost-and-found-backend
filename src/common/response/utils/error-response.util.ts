import { ErrorResponse } from '../interfaces/error-response.interface';

export function createErrorResponse(
  error: string,
  message: string,
  statusCode: number,
): ErrorResponse {
  return { error, message, statusCode };
}
