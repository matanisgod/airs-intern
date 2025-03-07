import { AxiosExecutionReturn } from '../interface';

import axiosDecorator from '@common/axios/axiosDecorator';

export const ExecutionApi = (): AxiosExecutionReturn => {
  const url: string = '/executions';
  const instance = axiosDecorator.create({ url });

  return {
    getExecutionLogs: async () => {
      return instance.get('/');
    },
    createExecution: async (body) => {
      return instance.post('/', body);
    },
    cancelExecution: async () => {
      return instance.post(':cancel');
    },
    cancelExecutionById: async (params) => {
      return instance.post(`/${params}:cancel`);
    },
  };
};
