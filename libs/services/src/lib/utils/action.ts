import { apiResponseType, sendRequestProps } from '@accent-tech/types';
import { sendRequest } from '../shared';

export async function createServerAction<T>(
  props: sendRequestProps<T>,
): Promise<apiResponseType<T>> {
  try {
    const response: apiResponseType<T> = await sendRequest(props);
    return response;
  } catch (error) {
    const e = error as Error;
    return {
      code: false,
      status: 500,
      error: e.message,
      result: null,
    };
  }
}
