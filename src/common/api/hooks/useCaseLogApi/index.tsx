import { useMemo } from 'react';

import type {
  UseCaseLogApi,
  GetDetailsByIdReqBody,
  GetGroupedCaseLogsByIdReqBody,
} from './interface';

import { api } from '@common/api';
import { useErrorSetter, logAxiosError } from '@utils';

export * from './interface';

export const useCaseLogApi = (): UseCaseLogApi => {
  const errorSetter = useErrorSetter();

  const instance = useMemo(() => {
    if (api) {
      return {
        getGroupedCaseLogsById: async (body: GetGroupedCaseLogsByIdReqBody) => {
          try {
            const response = await api().caseLog.getGroupedCaseLogsById(body);
            const groupedCaseLogs = response.data;
            return groupedCaseLogs;
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
