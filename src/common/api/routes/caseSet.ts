import type { CaseSet, ExpectedResult } from '@/recoil/status/caseSet/interface';
import axiosDecorator from '@common/axios/axiosDecorator';

export interface AxiosCaseSetReturn {
  importCaseSet: () => Promise<CaseSet>;
  getCaseSet: () => Promise<CaseSet>;
}

export interface AxiosExpectedResultReturn {
  getExpectedResultByID: (params: string) => Promise<ExpectedResult>;
}

export const CaseSetApi = (): AxiosCaseSetReturn => {
  const url: string = '/casesets';
  const instance = axiosDecorator.create({ url });

  return {
    importCaseSet: async () => {
      return instance.post(':import');
    },
    getCaseSet: async () => {
      return instance.get('/');
    },
  };
};

export const ExpectedResultApi = (): AxiosExpectedResultReturn => {
  const url: string = '/expected_result';
  const instance = axiosDecorator.create({ url });

  return {
    getExpectedResultByID: async (params: string) => {
      return instance.get(`/case/${params}`);
    },
  };
};
