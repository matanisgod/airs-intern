import { useMemo } from 'react';

import type { UseCaseSetApi } from './interface';

import { useErrorSetter, logAxiosError } from '@/utils';
import api from '@common/api';
import type { caseSetForm } from '@containers';

export const useCaseSetApi = (): UseCaseSetApi => {
  const errorSetter = useErrorSetter();

  const instance = useMemo(() => {
    if (api) {
      return {
        //TODO: caseSetForm을 req어쩌구로 수정
        importCaseSet: async (body: caseSetForm) => {
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
