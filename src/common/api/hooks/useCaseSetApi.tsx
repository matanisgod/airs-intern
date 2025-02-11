import { useMemo } from 'react';

//import { useRecoilValue } from 'recoil';
import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';
import { /* caseSetAtom, */ type CaseSet } from '@recoil/status';

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
