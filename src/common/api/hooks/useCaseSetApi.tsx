import { useMemo } from 'react';

import { useSetRecoilState } from 'recoil';

import { UseCaseSetApi } from '../interface';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';
import type { caseSetForm } from '@containers';
import { errorMessageAtom } from '@recoil/status';

export const useCaseSetApi = (): UseCaseSetApi => {
  const setErrorMessage = useSetRecoilState(errorMessageAtom);

  const instance = useMemo(() => {
    const ErrorSetter = (param) => {
      setErrorMessage({
        status: param.response?.status,
        statusText: param.response?.statusText,
      });
    };
    if (api) {
      return {
        importCaseSet: async (body: caseSetForm) => {
          try {
            const response = await api().caseSet.importCaseSet(body);
            const CaseSet = response.data;
            return CaseSet;
          } catch (e) {
            logAxiosError(e);
            ErrorSetter(e);
          }
        },
        getCaseSets: async () => {
          try {
            const response = await api().caseSet.getCaseSets();
            const caseSets = response.data;
            return caseSets;
          } catch (e) {
            logAxiosError(e);
            ErrorSetter(e);
          }
        },
      };
    } else {
      return null;
    }
  }, [api]);

  return instance;
};
