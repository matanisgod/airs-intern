import _ from 'lodash';

import { GetExecutionSth } from '@/common/api/interface/execution';
import { ApiHeaders } from '@common/api/interface/api';
import axiosDecorator from '@common/axios/axiosDecorator';

interface AxiosExecutionOptions {
  apiUrl: string | undefined;
  headers: ApiHeaders;
}

export interface AxiosExecutionReturn {
  postExecution: () => Promise<GetExecutionSth>;
  cancelExecution: () => Promise<GetExecutionSth>;
  cancelExecutionById: () => Promise<GetExecutionSth>;
}

const ExecutionApi = (opts: AxiosExecutionOptions): AxiosExecutionReturn => {
  const { apiUrl, headers } = opts;

  let baseURL: string | undefined = undefined;
  if (!_.isUndefined(apiUrl)) {
    baseURL = apiUrl;
  }
  const url = '/executions';
  const instance = axiosDecorator.create({ baseURL, headers, url });

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
