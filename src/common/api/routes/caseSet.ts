import type { ImportCaseSet, GetCaseSet } from '@/common/api/interface/caseSet';
import axiosDecorator from '@common/axios/axiosDecorator';

export interface AxiosCaseSetReturn {
  importCaseSet: () => Promise<ImportCaseSet>;
  getCaseSet: () => Promise<GetCaseSet>;
}

const CaseSetApi = (): AxiosCaseSetReturn => {
  
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

export default CaseSetApi;
