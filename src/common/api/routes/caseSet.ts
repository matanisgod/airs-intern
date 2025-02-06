import _ from 'lodash';

import { ImportCaseSet, GetCaseSet } from '@/common/api/interface/caseSet';

import axiosDecorator from '@common/axios/axiosDecorator';

interface AxiosCaseSetOptions {
  apiUrl: string | undefined;
}

export interface AxiosCaseSetReturn {
  importCaseSet: () => Promise<ImportCaseSet>;
  getCaseSet: () => Promise<GetCaseSet>;
}

const CaseSetApi = (opts: AxiosCaseSetOptions): AxiosCaseSetReturn => {
  const { apiUrl } = opts;

  let baseURL: string | undefined = undefined;
  if (!_.isUndefined(apiUrl)) {
    baseURL = apiUrl;
  }
  const url = '/casesets';
  const instance = axiosDecorator.create({ baseURL, url });

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
