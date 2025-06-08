import { ApiResponse } from '@accent-tech/types';

export function createApiResponse(message: string): ApiResponse {
  return { message };
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
