import { useMemo } from 'react';

import type { UseExecutionApi, CreateExecutionReqBody } from './interface';

import { api } from '@common/api';
import { useErrorSetter, logAxiosError } from '@utils';

export const useExecutionApi = (): UseExecutionApi => {
  const errorSetter = useErrorSetter();

  const instance = useMemo(() => {
    if (api) {
      return {
        getExecutionLogs: async () => {
          try {
            const response = await api().execution.getExecutionLogs();
            const executionLogs = response.data;
            return executionLogs;
          } catch (e) {
            logAxiosError(e);
            errorSetter(e);
          }
        },
        createExecution: async (body: CreateExecutionReqBody) => {
          try {
            const response = await api().execution.createExecution(body);
            const executionId = response.data;
            return executionId;
          } catch (e) {
            logAxiosError(e);
            errorSetter(e);
          }
        },
        cancelExecution: async () => {
          try {
            const response = await api().execution.cancelExecution();
            const executionLog = response.data;
            return executionLog;
          } catch (e) {
            logAxiosError(e);
            errorSetter(e);
          }
        },
        cancelExecutionById: async (params: string) => {
          try {
            const response = await api().execution.cancelExecutionById(params);
            const executionLog = response.data;
            return executionLog;
          } catch (e) {
            logAxiosError(e);
            errorSetter(e);
          }
        },
      };
    } else {
      return null;
    }
  }, []);

  return instance;
};
