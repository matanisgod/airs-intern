import { AxiosCaseSetReturn } from '../interface';

import axiosDecorator from '@common/axios/axiosDecorator';

export const CaseSetApi = (): AxiosCaseSetReturn => {
  const url: string = '/';
  const instance = axiosDecorator.create({ url });

  return {
    importCaseSet: async (body) => {
      return instance.post('casesets:import', body);
    },
    getCaseSets: async () => {
      return instance.get('casesets/');
    },
  };
};
