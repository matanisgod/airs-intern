import type { AxiosCaseReturn } from './interface';

import axiosDecorator from '@common/axios/axiosDecorator';

export const CaseApi = (): AxiosCaseReturn => {
  const url: string = '/case';
  const instance = axiosDecorator.create({ url });

  return {
    getCasesByCaseSetId: async (params: string) => {
      return instance.get(`/case_set/${params}`);
    },
  };
};

export * from './interface'; //TODO: 이거 지우기
