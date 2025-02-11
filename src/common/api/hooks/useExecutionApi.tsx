import { useMemo } from 'react';

//import { useRecoilValue } from 'recoil';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';
import { /* executionAtom, */ type ExecutionLog } from '@recoil/status';

type UseExecutionApi = {
  postExecution: () => Promise<ExecutionLog | undefined>;
  cancelExecution: () => Promise<ExecutionLog | undefined>;
  cancelExecutionById: () => Promise<ExecutionLog | undefined>;
} | null;

export const useExecutionApi = (): UseExecutionApi => {
  const instance = useMemo(() => {
    if (api) {
      return {
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
        cancelExecutionById: async () => {
          try {
            const execution = await api().execution.cancelExecutionById();
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
