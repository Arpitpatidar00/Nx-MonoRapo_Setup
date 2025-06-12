export enum MethodTypesEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export enum ToastTypeEnum {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export type sendRequestProps<T> = {
  url: string;
  body?: T | Record<string, string | number | boolean> | FormData | null;
  authToken?: string | null;
  params?: Record<string, string> | null | apiParams;
  method?: MethodTypesEnum;
  showSuccessToast?: boolean;
};

export type apiResponseType<T = unknown> = {
  code: boolean;
  status: number;
  error: string | null;
  result: T | null;
  message?: string;
};

export type apiParams =
  | {
      limit?: number;
      page?: number;
      searchTerm?: string;
      id?: string;
      status?: boolean;
      sort?: string;
      sortOn?: string;
      slug?: string;
      userId?: string;
      timeUnit?: string;
    }
  | Record<string, string>;
