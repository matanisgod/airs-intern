import { useMemo } from 'react';

import { useSetRecoilState } from 'recoil';

import { UseCaseApi } from '../interface';

import { errorMessageAtom } from '@/recoil/status';
import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';

export const useCaseApi = (): UseCaseApi => {
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
        getCasesByCaseSetId: async (params: string) => {
          try {
            const response = await api().case.getCasesByCaseSetId(params);
            return response.data;
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
