import { useMemo } from 'react';

import type {
  UseCaseLogApi,
  GetDetailsByIdReqBody,
  GetDistinctCaseLogsByIdReqBody,
} from './interface';

import { useErrorSetter, logAxiosError } from '@/utils';
import api from '@common/api';

export * from './interface';

export const useCaseLogApi = (): UseCaseLogApi => {
  const errorSetter = useErrorSetter();

  const instance = useMemo(() => {
    if (api) {
      return {
        getDistinctCaseLogsById: async (body: GetDistinctCaseLogsByIdReqBody) => {
          try {
            const response = await api().caseLog.getDistinctCaseLogsById(body);
            const distinctCaseLogs = response.data;
            return distinctCaseLogs;
          } catch (e) {
            logAxiosError(e);
            errorSetter(e);
          }
        },
        getDetailsById: async (body: GetDetailsByIdReqBody) => {
          try {
            const response = await api().caseLog.getDetailsById(body);
            const details = response.data;
            return details;
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
