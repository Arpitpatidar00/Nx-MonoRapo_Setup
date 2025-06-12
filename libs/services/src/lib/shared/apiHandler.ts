import {
  apiResponseType,
  MethodTypesEnum,
  sendRequestProps,
} from '@accent-tech/types';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { getToken, isServerSide } from '../utils';
import { ErrorService } from './errorService';
import { http } from './http';

export const sendRequest = async <T>({
  url,
  body = null,
  authToken = null,
  params = null,
  method = MethodTypesEnum.GET,
  showSuccessToast = true,
}: sendRequestProps<T>): Promise<apiResponseType<T>> => {
  try {
    const token = await getToken();
    const reqMethod = method.toLowerCase();
    const config: AxiosRequestConfig = {
      method,
      url,
    };

    if (
      reqMethod === MethodTypesEnum.PUT ||
      reqMethod === MethodTypesEnum.PATCH ||
      reqMethod === MethodTypesEnum.POST ||
      reqMethod === MethodTypesEnum.DELETE
    ) {
      if (body) {
        config.data = body;
      }
      if (params) {
        config.params = params;
      }
    }

    if (method.toLowerCase() === MethodTypesEnum.GET) {
      config.params = body;
    }

    if (body instanceof FormData) {
      config.headers = {
        'Content-Type': 'multipart/form-data',
      };
    } else {
      config.headers = {
        'Content-Type': 'application/json; charset=utf-8',
      };
    }

    if (authToken || token) {
      const tokenData = authToken || token;
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${tokenData}`,
      };
    }

    const response = await http(config);
    if (!isServerSide && showSuccessToast) {
      ErrorService.handleResponse({
        code: response.data.code,
        status: response.status,
        error: response.data.message,
        result: response.data.result,
      });
    }
    return {
      ...response.data,
      status: response.status,
      error: response.data.code ? null : response.data.message,
    } as apiResponseType<T>;
  } catch (error: unknown) {
    const err = error as AxiosError;
    if (!isServerSide) {
      ErrorService.handleResponse(ErrorService.serializeError(err));
    }

    return {
      code: false,
      status: err?.response?.status || 500,
      error: err?.message || 'Failed to fetch',
      result: null,
    } as apiResponseType<T>;
  }
};
