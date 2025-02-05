import { useMemo } from 'react';

import { useRecoilValue } from 'recoil';

import { logAxiosError } from '@/utils/logAxiosError';
import api from '@common/api';
import { Examples, examplesAtom } from '@recoil/status';

type UseExamplesApi = {
  getExamples: (accessToken: string) => Promise<Examples | undefined>;
} | null;

export const useExamplesApi = (): UseExamplesApi => {

  const instance = useMemo(() => {
    if (api) {
      return {
        getExamples: async (accessToken) => {
          try {
            const examples = await api(accessToken).examples.getExamples();
            return examples;
          } catch (e) {
            logAxiosError(e);
          }
        },
      };
    } else {
      return null;
    }
  }, [api]);

  return instance;
};
