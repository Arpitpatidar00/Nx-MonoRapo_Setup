// import { GridPaginationModel } from '@mui/x-data-grid';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { apiParams, apiResponseType } from './siteApi';

export enum ApiModulesEnum {
  ADDRESSES = 'ADDRESSES',
  BRANDS = 'BRANDS',
  CATEGORIES = 'CATEGORIES',
  ATTRIBUTES = 'ATTRIBUTES',
  COUNTRIES = 'COUNTRIES',
  STATES = 'STATES',
  CITIES = 'CITIES',
  PRODUCTS = 'PRODUCTS',
  USER = 'USER',
}

interface ApiModuleHooks<T, R> {
  getAllQuery: (
    params: apiParams,
    initialData: {
      data: T[];
      totalCount: number;
    },
    // paginationModel: GridPaginationModel,
  ) => UseQueryResult<{
    data: T[];
    totalCount: number;
  }>;
  createMutation: () => UseMutationResult<apiResponseType<R>>;
  updateMutation: () => UseMutationResult<apiResponseType<Partial<R>>>;
  deleteMutation: () => UseMutationResult<apiResponseType<R>>;
  toggleStatusMutation: () => UseMutationResult<apiResponseType<R>>;
  excelDownload: (
    params: apiParams,
  ) => UseMutationResult<apiResponseType<Blob>>;
}
