import { useMemo } from 'react';

import { useSetRecoilState } from 'recoil';

import { UseCaseApi } from '../interface';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';
import { errorMessageAtom } from '@recoil/status';

export const useCaseApi = (): UseCaseApi => {
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
        getCasesByCaseSetId: async (params: string) => {
          try {
            const response = await api().case.getCasesByCaseSetId(params);
            const cases = response.data;
            return cases;
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
