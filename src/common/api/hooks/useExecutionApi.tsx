import { useMemo } from 'react';

import { UseExecutionApi } from '../interface/execution';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';

export const useExecutionApi = (): UseExecutionApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        getExecutionLog: async () => {
          try {
            const executionLogs = await api().execution.getExecutionLog();
            return executionLogs;
          } catch (e) {
            logAxiosError(e);
          }
        },
        postExecution: async () => {
          try {
            const execution = await api().execution.postExecution();
            return execution;
          } catch (e) {
            logAxiosError(e);
          }
        },
        cancelExecution: async () => {
          try {
            const execution = await api().execution.cancelExecution();
            return execution;
          } catch (e) {
            logAxiosError(e);
          }
        },
        cancelExecutionById: async (params) => {
          try {
            const execution = await api().execution.cancelExecutionById(params);
            return execution;
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
