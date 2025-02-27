import { AxiosCaseReturn } from '../interface/case';

import axiosDecorator from '@common/axios/axiosDecorator';

export const CaseApi = (): AxiosCaseReturn => {
  const url: string = '/case/case_set';
  const instance = axiosDecorator.create({ url });

  return {
    getCasesByCaseSetId: async (params: string) => {
      return instance.get(`${params}`);
    },
  };
};
