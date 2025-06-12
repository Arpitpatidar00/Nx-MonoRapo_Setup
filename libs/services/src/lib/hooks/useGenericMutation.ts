import { apiResponseType } from '@accent-tech/types';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { ErrorService } from '../shared';

// @Types
type MutationFnType<T> = (...args: any[]) => Promise<apiResponseType<T>>;

export function useGenericMutation<T>(
  mutationFn: MutationFnType<T>,
  queryKeysToInvalidate: string[],
): UseMutationResult<apiResponseType<T>> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (response: apiResponseType<T>) => {
      if (response.code) {
        queryClient.invalidateQueries({ queryKey: queryKeysToInvalidate });
      } else {
        ErrorService.handleResponse(response);
        throw response;
      }
    },
  });
}
