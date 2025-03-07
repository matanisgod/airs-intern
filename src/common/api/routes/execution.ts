import { AxiosExecutionReturn } from '../interface';

import axiosDecorator from '@common/axios/axiosDecorator';

export const ExecutionApi = (): AxiosExecutionReturn => {
  const url: string = '/';
  const instance = axiosDecorator.create({ url });

  return {
    getExecutionLogs: async () => {
      return instance.get('executions/');
    },
    createExecution: async (body) => {
      return instance.post('executions/', body);
    },
    cancelExecution: async () => {
      return instance.post('executions:cancel');
    },
    cancelExecutionById: async (params) => {
      return instance.post(`executions/${params}:cancel`);
    },
  };
};
