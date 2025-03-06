import { useMemo } from 'react';

import { UseCaseLogApi } from '../interface';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';

export const useCaseLogApi = (): UseCaseLogApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        getDistinctCaseLogsById: async (body: object) => {
          try {
            const response = await api().caseLog.getDistinctCaseLogsById(body);
            return response.data;
          } catch (e) {
            logAxiosError(e);
          }
        },
        getDetailsById: async (body: object) => {
          try {
            const response = await api().caseLog.getDetailsById(body);
            return response.data;
          } catch (e) {
            logAxiosError(e);
          }
        },
      };
    } else {
      return null;
    }
  }, [api]);

  return instance;
};
