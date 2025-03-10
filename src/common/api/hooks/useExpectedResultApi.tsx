import { useMemo } from 'react';

import { useSetRecoilState } from 'recoil';

import { UseExpectedResultApi } from '../interface';

import { errorMessageAtom } from '@/recoil/status';
import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';

export const useExpectedResultApi = (): UseExpectedResultApi => {
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
        getExpectedResultById: async (params: string) => {
          try {
            const response = await api().expectedResult.getExpectedResultById(params);
            const expectedResult = response.data;
            return expectedResult;
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
