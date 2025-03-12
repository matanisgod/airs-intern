import { useMemo } from 'react';

import { useSetRecoilState } from 'recoil';

import {
  UseCaseLogApi,
  GetDetailsByIdReqBody,
  GetDistinctCaseLogsByIdReqBody,
} from '../interface';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';
import { errorMessageAtom } from '@recoil/status';

export const useCaseLogApi = (): UseCaseLogApi => {
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
        getDistinctCaseLogsById: async (body: GetDistinctCaseLogsByIdReqBody) => {
          try {
            const response = await api().caseLog.getDistinctCaseLogsById(body);
            const distinctCaseLogs = response.data;
            return distinctCaseLogs;
          } catch (e) {
            logAxiosError(e);
            ErrorSetter(e);
          }
        },
        getDetailsById: async (body: GetDetailsByIdReqBody) => {
          try {
            const response = await api().caseLog.getDetailsById(body);
            const details = response.data;
            return details;
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
