import { useMemo } from 'react';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';
import type { CaseSet, ExpectedResult } from '@recoil/status';

type UseCaseSetApi = {
  importCaseSet: () => Promise<CaseSet | undefined>;
  getCaseSet: () => Promise<CaseSet | undefined>;
} | null;

type UseExpectedResultApi = {
  getExpectedResultByID: (params: string) => Promise<ExpectedResult | undefined>;
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
            const caseSet = await api().caseSet.getCaseSet();
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

export const useExpectedResultApi = (): UseExpectedResultApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        getExpectedResultByID: async (params: string) => {
          try {
            const expectedResult =
              await api().expectedResult.getExpectedResultByID(params);
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
