import { useMemo } from 'react';

import { useRecoilValue } from 'recoil';
import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';
import { caseSetAtom, CaseSets } from '@recoil/status';

type UseCaseSetApi = {
  importCaseSet: (accessToken: string) => Promise<CaseSets | undefined>;
} | null;

export const useCaseSetApi = (): UseCaseSetApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        importCaseSet: async (accessToken) => {
          try {
            const caseSet = await api(accessToken).caseSet.importCaseSet();
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
