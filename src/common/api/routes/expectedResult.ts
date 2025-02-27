import { AxiosExpectedResultReturn } from '../interface/expectedResult';

import axiosDecorator from '@common/axios/axiosDecorator';

export const ExpectedResultApi = (): AxiosExpectedResultReturn => {
  const url: string = '/expected_result/case/';
  const instance = axiosDecorator.create({ url });

  return {
    getExpectedResultById: async (params: string) => {
      return instance.get(`${params}`);
    },
  };
};
