import { AxiosExpectedResultReturn } from '../interface';

import axiosDecorator from '@common/axios/axiosDecorator';

export const ExpectedResultApi = (): AxiosExpectedResultReturn => {
  const url: string = '/expected_result';
  const instance = axiosDecorator.create({ url });

  return {
    getExpectedResultById: async (params: string) => {
      return instance.get(`/case/${params}`);
    },
  };
};
