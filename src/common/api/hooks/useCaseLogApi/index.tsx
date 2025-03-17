import { useMemo } from 'react';

import { useErrorSetter } from '../util';

import type {
  UseCaseLogApi,
  GetDetailsByIdReqBody,
  GetDistinctCaseLogsByIdReqBody,
} from './interface';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';

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

export * from './interface';
