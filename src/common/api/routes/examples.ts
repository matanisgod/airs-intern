import _ from 'lodash';

import { GetExamplesResBody } from '@/common/api/interface/examples';
import { ApiHeaders } from '@common/api/interface/api';
import axiosDecorator from '@common/axios/axiosDecorator';

interface AxiosExamplesOptions {
  apiUrl: string | undefined;
  headers: ApiHeaders;
}

export interface AxiosExamplesReturn {
  getExamples: () => Promise<GetExamplesResBody>;
}

const axiosExamples = (opts: AxiosExamplesOptions): AxiosExamplesReturn => {
  const { apiUrl, headers } = opts;

  let baseURL: string | undefined = undefined;
  if (!_.isUndefined(apiUrl)) {
    baseURL = apiUrl;
  }
  const url = '/overview';
  const instance = axiosDecorator.create({ baseURL, headers, url });

  return {
    getExamples: async () => {
      return instance.get('/');
    },
  };
};

export default axiosExamples;
