import { useMemo } from 'react';

import type { UseCaseSetApi, ImportCaseSetReqBody } from './interface';

import { useErrorSetter, logAxiosError } from '@/utils';
import api from '@common/api';

export const useCaseSetApi = (): UseCaseSetApi => {
  const errorSetter = useErrorSetter();

  const instance = useMemo(() => {
    if (api) {
      return {
        importCaseSet: async (body: ImportCaseSetReqBody) => {
          try {
            const response = await api().caseSet.importCaseSet(body);
            const caseSet = response.data;
            return caseSet;
          } catch (e) {
            logAxiosError(e);
            errorSetter(e);
          }
        },
        getCaseSets: async () => {
          try {
            const response = await api().caseSet.getCaseSets();
            const caseSets = response.data;
            return caseSets;
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
