import { AxiosExecutionReturn } from '../interface/execution';

import axiosDecorator from '@common/axios/axiosDecorator';

export const ExecutionApi = (): AxiosExecutionReturn => {
  const url: string = '/executions';
  const instance = axiosDecorator.create({ url });

  return {
    postExecution: async () => {
      return instance.post('/');
    },
    cancelExecution: async () => {
      return instance.post(':cancel');
    },
    cancelExecutionById: async (params) => {
      return instance.post(`/${params}:cancel`);
    },
  };
};
