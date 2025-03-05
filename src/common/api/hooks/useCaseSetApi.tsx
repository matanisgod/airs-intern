import { useMemo } from 'react';

import { UseCaseSetApi } from '../interface';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';

export const useCaseSetApi = (): UseCaseSetApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        importCaseSet: async () => {
          try {
            const response = await api().caseSet.importCaseSet();
            return response.data;
          } catch (e) {
            logAxiosError(e);
          }
        },
        getCaseSets: async () => {
          try {
            const response = await api().caseSet.getCaseSets();
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
