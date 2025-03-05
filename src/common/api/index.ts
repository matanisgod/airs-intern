import {
  AxiosCaseReturn,
  AxiosCaseSetReturn,
  AxiosExecutionReturn,
  AxiosExpectedResultReturn,
} from './interface';

import { CaseApi, CaseSetApi, ExecutionApi, ExpectedResultApi } from '@common/api';

export * from './hooks';
export * from './interface';
export * from './routes';

type ApiObject = {
  caseSet: AxiosCaseSetReturn;
  expectedResult: AxiosExpectedResultReturn;
  execution: AxiosExecutionReturn;
  case: AxiosCaseReturn;
};

const api = (): ApiObject => {
  return {
    caseSet: CaseSetApi(),
    expectedResult: ExpectedResultApi(),
    execution: ExecutionApi(),
    case: CaseApi(),
  };
};

export default api;
