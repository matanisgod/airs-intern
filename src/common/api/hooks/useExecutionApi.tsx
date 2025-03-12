import { useMemo } from 'react';

import { useSetRecoilState } from 'recoil';

import { UseExecutionApi } from '../interface';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';
import type { ExecutionForm } from '@containers';
import { errorMessageAtom } from '@recoil/status';

export const useExecutionApi = (): UseExecutionApi => {
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
        getExecutionLogs: async () => {
          try {
            const response = await api().execution.getExecutionLogs();
            const executionLogs = response.data;
            return executionLogs;
          } catch (e) {
            logAxiosError(e);
            ErrorSetter(e);
          }
        },
        createExecution: async (body: ExecutionForm) => {
          try {
            const response = await api().execution.createExecution(body);
            const executionId = response.data;
            return executionId;
          } catch (e) {
            logAxiosError(e);
            ErrorSetter(e);
          }
        },
        cancelExecution: async () => {
          try {
            const response = await api().execution.cancelExecution();
            const executionLog = response.data;
            return executionLog;
          } catch (e) {
            logAxiosError(e);
            ErrorSetter(e);
          }
        },
        cancelExecutionById: async (params: string) => {
          try {
            const response = await api().execution.cancelExecutionById(params);
            const executionLog = response.data;
            return executionLog;
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
