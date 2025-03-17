import { useMemo } from 'react';

import { useErrorSetter } from '../util';

import type { UseCaseApi } from './interface';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';

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
  }, [api]);

  return instance;
};

export * from './interface';
