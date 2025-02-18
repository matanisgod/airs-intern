import { useMemo } from 'react';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';
import { type CaseSet } from '@recoil/status';

type UseCaseSetApi = {
  importCaseSet: () => Promise<CaseSet | undefined>;
  getCaseSet: () => Promise<CaseSet | undefined>;
} | null;

export const useCaseSetApi = (): UseCaseSetApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        importCaseSet: async () => {
          try {
            const caseSet = await api().caseSet.importCaseSet();
            return caseSet;
          } catch (e) {
            logAxiosError(e);
          }
        },
        getCaseSet: async () => {
          try {
            const response = await api().caseSet.getCaseSet();
            const caseSet = response.data;
            return caseSet;
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
