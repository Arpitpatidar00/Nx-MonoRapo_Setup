import { ApiResponse } from '@accent-tech/types';

export async function exampleService(): Promise<ApiResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: 'Hello from shared service!',
      });
    }, 500);
  });
}
