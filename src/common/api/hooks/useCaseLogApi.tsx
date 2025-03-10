import { useMemo } from 'react';

import { useSetRecoilState } from 'recoil';

import { UseCaseLogApi } from '../interface';

import { errorMessageAtom } from '@/recoil/status';
import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';

export const useCaseLogApi = (): UseCaseLogApi => {
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
        getDistinctCaseLogsById: async (body: object) => {
          try {
            const response = await api().caseLog.getDistinctCaseLogsById(body);
            const distinctCaseLogs = response.data;
            return distinctCaseLogs;
          } catch (e) {
            logAxiosError(e);
            Errorsetter(e);
          }
        },
        getDetailsById: async (body: object) => {
          try {
            const response = await api().caseLog.getDetailsById(body);
            const details = response.data;
            return details;
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
