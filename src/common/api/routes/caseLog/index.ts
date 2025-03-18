import type { AxiosCaseLogReturn } from './interface';

import axiosDecorator from '@common/axios/axiosDecorator';

export * from './interface';

export const CaseLogApi = (): AxiosCaseLogReturn => {
  const url: string = '/case_log';
  const instance = axiosDecorator.create({ url });

  return {
    getDistinctCaseLogsById: async (body) => {
      return instance.post('/distinct', body);
    },
    getDetailsById: async (body) => {
      return instance.post('/details', body);
    },
  };
};
