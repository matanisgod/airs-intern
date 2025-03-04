import { useMemo } from 'react';

import { UseCaseSetApi } from '../interface/caseSet';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';

export const useCaseSetApi = (): UseCaseSetApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        importCaseSet: async () => {
          try {
            const caseSet = await api().caseSet.importCaseSet();
            return caseSet.data;
          } catch (e) {
            logAxiosError(e);
          }
        },
        getCaseSets: async () => {
          try {
            const caseSet = await api().caseSet.getCaseSets();
            return caseSet.data;
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
