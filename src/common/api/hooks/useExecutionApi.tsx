import { useMemo } from 'react';

import { useSetRecoilState } from 'recoil';

import { UseExecutionApi } from '../interface';

import { errorMessageAtom } from '@/recoil/status';
import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';

export const useExecutionApi = (): UseExecutionApi => {
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
        getExecutionLogs: async () => {
          try {
            const response = await api().execution.getExecutionLogs();
            const executionLogs = response.data;
            return executionLogs;
          } catch (e) {
            logAxiosError(e);
            Errorsetter(e);
          }
        },
        createExecution: async (body: object) => {
          try {
            const response = await api().execution.createExecution(body);
            const executionId = response.data;
            return executionId;
          } catch (e) {
            logAxiosError(e);
            Errorsetter(e);
          }
        },
        cancelExecution: async () => {
          try {
            const response = await api().execution.cancelExecution();
            const executionLog = response.data;
            return executionLog;
          } catch (e) {
            logAxiosError(e);
            Errorsetter(e);
          }
        },
        cancelExecutionById: async (params: string) => {
          try {
            const response = await api().execution.cancelExecutionById(params);
            const executionLog = response.data;
            return executionLog;
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
