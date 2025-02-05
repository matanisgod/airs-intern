import _ from 'lodash';

import { GetCaseSetSth } from '@/common/api/interface/caseSet';
import { ApiHeaders } from '@common/api/interface/api';
import axiosDecorator from '@common/axios/axiosDecorator';

interface AxiosCaseSetOptions {
  apiUrl: string | undefined;
  headers: ApiHeaders;
}

export interface AxiosCaseSetReturn {
  importCaseSet: () => Promise<GetCaseSetSth>;
}

const CaseSetApi = (opts: AxiosCaseSetOptions): AxiosCaseSetReturn => {
  const { apiUrl, headers } = opts;

  let baseURL: string | undefined = undefined;
  if (!_.isUndefined(apiUrl)) {
    baseURL = apiUrl;
  }
  const url = '/casesets';
  const instance = axiosDecorator.create({ baseURL, headers, url });

  return {
    importCaseSet: async () => {
      return instance.post(':import');
    },
  };
};

export default CaseSetApi;
