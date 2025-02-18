import type { ImportCaseSet } from '@/common/api/interface/caseSet';
import type { CaseSet } from '@/recoil/status/caseSet/interface';
import axiosDecorator from '@common/axios/axiosDecorator';

interface GetCaseSetResponse {
  message: string;
  data: CaseSet;
}

export interface AxiosCaseSetReturn {
  importCaseSet: () => Promise<ImportCaseSet>;
  getCaseSet: () => Promise<GetCaseSetResponse>;
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
