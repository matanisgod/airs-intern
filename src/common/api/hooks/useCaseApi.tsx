import { useMemo } from 'react';

import { UseCaseApi } from '../interface';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';

export const useCaseApi = (): UseCaseApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        getCasesByCaseSetId: async (params: string) => {
          try {
            const response = await api().case.getCasesByCaseSetId(params);
            return response.data;
          } catch (e) {
            logAxiosError(e);
          }
        },
      };
    } else {
      return null;
    }
  }, [api]);

  return instance;
};
