import { apiResponseType } from '@accent-tech/types';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import { ErrorService } from '../shared/errorService';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      const response = error as apiResponseType;
      ErrorService.handleResponse(response);
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      throwOnError: () => true,
      // enabled: false,
    },
    mutations: {
      onError: (error: unknown) => {
        ErrorService.sendErrorMessage(error as string);
      },
    },
  },
});
