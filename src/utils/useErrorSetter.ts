import { isAxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { errorMessageAtom, dichotomyAtom } from '@recoil';

export const useErrorSetter = () => {
  const setErrorMessage = useSetRecoilState(errorMessageAtom);
  const setErrorModalOpen = useSetRecoilState(dichotomyAtom('isErrorModalOpen'));
  return (param: unknown) => {
    if (isAxiosError(param)) {
      setErrorMessage({
        status: param.response?.status,
        statusText: param.response?.statusText,
      });
      setErrorModalOpen(true);
    }
  };
};
