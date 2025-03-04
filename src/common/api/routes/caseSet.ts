import { AxiosCaseSetReturn } from '../interface/caseSet';

import axiosDecorator from '@common/axios/axiosDecorator';

export const CaseSetApi = (): AxiosCaseSetReturn => {
  const url: string = '/casesets';
  const instance = axiosDecorator.create({ url });

  return {
    importCaseSet: async () => {
      return instance.post(':import');
    },
    getCaseSets: async () => {
      return instance.get('/');
    },
  };
};
