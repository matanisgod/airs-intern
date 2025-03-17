import { useMemo } from 'react';

import { useErrorSetter } from '../util';

import type { UseCaseSetApi } from './interface';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';
import type { caseSetForm } from '@containers';

export const useCaseSetApi = (): UseCaseSetApi => {
  const errorSetter = useErrorSetter();
  const instance = useMemo(() => {
    if (api) {
      return {
        importCaseSet: async (body: caseSetForm) => {
          try {
            const response = await api().caseSet.importCaseSet(body);
            const CaseSet = response.data;
            return CaseSet;
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
export * from './interface';
