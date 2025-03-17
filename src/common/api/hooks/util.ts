import { isAxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import { errorMessageAtom } from '@recoil/status';

//TODO: 파일 위치 변경
export const useErrorSetter = () => {
  const setErrorMessage = useSetRecoilState(errorMessageAtom);

  return (param: unknown) => {
    if (isAxiosError(param)) {
      setErrorMessage({
        status: param.response?.status,
        statusText: param.response?.statusText,
      });
    }
  };
};
