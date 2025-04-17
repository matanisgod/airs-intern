import { useMemo } from 'react';

import type { UseExpectedResultApi } from './interface';

import { api } from '@common/api';
import { useErrorSetter, logAxiosError } from '@utils';

export const useExpectedResultApi = (): UseExpectedResultApi => {
  const errorSetter = useErrorSetter();

  const instance = useMemo(() => {
    if (api) {
      return {
        getExpectedResultById: async (params: string) => {
          try {
            const response = await api().expectedResult.getExpectedResultById(params);
            const expectedResult = response.data;
            return expectedResult;
          } catch (e) {
            logAxiosError(e);
            errorSetter(e);
          }
        },
      };
    } else {
      return null;
    }
  }, [api]);

  return instance;
};
