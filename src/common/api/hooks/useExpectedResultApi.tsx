import { useMemo } from 'react';

import { UseExpectedResultApi } from '../interface/expectedResult';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';

export const useExpectedResultApi = (): UseExpectedResultApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        getExpectedResultById: async (params: string) => {
          try {
            const expectedResult =
              await api().expectedResult.getExpectedResultById(params);
            return expectedResult;
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
