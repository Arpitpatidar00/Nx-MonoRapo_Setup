import { SiteImageType } from '@accent-tech/types';

// export type MulterFilesType = { [fieldname: string]: Express.Multer.File[] };
export type FormattedImagesType = { [fieldname: string]: SiteImageType[] };

export interface QueryParams {
  page?: string;
  limit?: string;
  sort?: string;
  status?: string;
}

export type SortDirection = 1 | -1;

export interface AdditionalSort {
  [key: string]: SortDirection;
}
