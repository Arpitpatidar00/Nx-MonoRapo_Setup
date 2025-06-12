import {
  API_ENDPOINTS,
  createServerAction,
  useGenericMutation,
} from '@accent-tech/services';
import { apiParams, MethodTypesEnum } from '@accent-tech/types';

/**
 * Simulated test API request (mock)
 */
export const testApiAction = async ({
  params,
  authToken,
  showSuccessToast,
}: {
  params: apiParams;
  authToken?: string;
  showSuccessToast?: boolean;
}) => {
  return createServerAction<any>({
    url: API_ENDPOINTS.test,
    method: MethodTypesEnum.GET,
    authToken,
    showSuccessToast,
  });
};

/**
 * Hook to use test API with react-query mutation
 */
export const useTestApi = () => {
  return useGenericMutation(
    (params: apiParams) => testApiAction({ params }),
    ['testApi'],
  );
};
