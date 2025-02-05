import { useMemo } from 'react';

import { useRecoilValue } from 'recoil';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';
import { executionAtom, Executions } from '@recoil/status';

type UseExecutionApi = {
  postExecution: (accessToken: string) => Promise<Executions | undefined>;
  cancelExecution: (accessToken: string) => Promise<Executions | undefined>;
  cancelExecutionById: (accessToken: string) => Promise<Executions | undefined>;
} | null;

export const useExecutionApi = (): UseExecutionApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
        postExecution: async (accessToken) => {
          try {
            const execution = await api(accessToken).execution.postExecution();
            return execution;
          } catch (e) {
            logAxiosError(e);
          }
        },
        cancelExecution: async (accessToken) => {
          try {
            const execution = await api(accessToken).execution.cancelExecution();
            return execution;
          } catch (e) {
            logAxiosError(e);
          }
        },
        cancelExecutionById: async (accessToken) => {
          try {
            const execution = await api(accessToken).execution.cancelExecutionById();
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
