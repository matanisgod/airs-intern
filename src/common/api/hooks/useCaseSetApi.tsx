import { useMemo } from 'react';

import { useSetRecoilState } from 'recoil';

import { UseCaseSetApi } from '../interface';

import { errorMessageAtom } from '@/recoil/status';
import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';

export const useCaseSetApi = (): UseCaseSetApi => {
  const setErrorMessage = useSetRecoilState(errorMessageAtom);

  const instance = useMemo(() => {
    const Errorsetter = (param) => {
      setErrorMessage({
        errorStatus: param.response?.status,
        errorStatusText: param.response?.statusText,
        errorData: param.response?.data,
      });
    };
    if (api) {
      return {
        importCaseSet: async (body: object) => {
          try {
            const response = await api().caseSet.importCaseSet(body);
            return response.message;
          } catch (e) {
            logAxiosError(e);
            Errorsetter(e);
          }
        },
        getCaseSets: async () => {
          try {
            const response = await api().caseSet.getCaseSets();
            const caseSets = response.data;
            return caseSets;
          } catch (e) {
            logAxiosError(e);
            Errorsetter(e);
          }
        },
      };
    } else {
      return null;
    }
  }, [api]);

  return instance;
};
