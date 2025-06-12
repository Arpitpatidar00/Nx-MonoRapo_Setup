'use client';
import { apiResponseType } from '@accent-tech/types';
import { useEffect } from 'react';
import { ErrorService } from '../shared';

export const useError = (
  response?: apiResponseType | null,
  responses?: apiResponseType[],
) => {
  useEffect(() => {
    if (responses?.length) {
      responses.forEach((item) => {
        if (item?.error) {
          ErrorService.handleSeverError(item);
        }
      });
    } else if (response?.error) {
      ErrorService.handleSeverError(response);
    }
  }, [response, response?.error, responses]);
};
