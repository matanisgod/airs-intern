import { useMemo } from 'react';

import type { UseCaseApi } from './interface';

import { api } from '@common/api';
import { useErrorSetter, logAxiosError } from '@utils';

export const useCaseApi = (): UseCaseApi => {
  const errorSetter = useErrorSetter();

  const instance = useMemo(() => {
    if (api) {
      return {
        getCasesByCaseSetId: async (params: string) => {
          try {
            const response = await api().case.getCasesByCaseSetId(params);
            const cases = response.data;
            return cases;
          } catch (e) {
            logAxiosError(e);
            errorSetter(e);
          }
        },
      };
    } else {
      return null;
    }
  }, []);

  return instance;
};
