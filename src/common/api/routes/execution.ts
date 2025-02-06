import _ from 'lodash';

import {
  Postexecution,
  CancelExecution,
  cancelExecutionById,
} from '@/common/api/interface/execution';

import axiosDecorator from '@common/axios/axiosDecorator';

interface AxiosExecutionOptions {
  apiUrl: string | undefined;
}

export interface AxiosExecutionReturn {
  postExecution: () => Promise<Postexecution>;
  cancelExecution: () => Promise<CancelExecution>;
  cancelExecutionById: () => Promise<cancelExecutionById>;
}

const ExecutionApi = (opts: AxiosExecutionOptions): AxiosExecutionReturn => {
  const { apiUrl } = opts;

  let baseURL: string | undefined = undefined;
  if (!_.isUndefined(apiUrl)) {
    baseURL = apiUrl;
  }
  const url = '/executions';
  const instance = axiosDecorator.create({ baseURL, url });

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
