import type {Postexecution,CancelExecution,cancelExecutionById} from '@/common/api/interface/execution';
import axiosDecorator from '@common/axios/axiosDecorator';

export interface AxiosExecutionReturn {
  postExecution: () => Promise<Postexecution>;
  cancelExecution: () => Promise<CancelExecution>;
  cancelExecutionById: () => Promise<cancelExecutionById>;
}

const ExecutionApi = (): AxiosExecutionReturn => {

  const url: string = '/executions';
  const instance = axiosDecorator.create({ url });

  return {
    postExecution: async () => {
      return instance.post('/');
    },
    cancelExecution: async () => {
      return instance.post(':cancel');
    },
    cancelExecutionById: async () => {
      return instance.post('/{executionId}:cancel');
    },
  };
};

export default ExecutionApi;
