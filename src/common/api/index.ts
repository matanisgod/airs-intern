import {
  AxiosCaseSetReturn,
  AxiosExpectedResultReturn,
  AxiosExecutionReturn,
  AxiosCaseReturn,
  AxiosCaseLogReturn,
} from './routes';

import {
  CaseApi,
  CaseSetApi,
  ExecutionApi,
  ExpectedResultApi,
  CaseLogApi,
} from '@common/api';

export * from './hooks';
export * from './routes';

type ApiObject = {
  caseSet: AxiosCaseSetReturn;
  expectedResult: AxiosExpectedResultReturn;
  execution: AxiosExecutionReturn;
  case: AxiosCaseReturn;
  caseLog: AxiosCaseLogReturn;
};

const api = (): ApiObject => {
  return {
    caseSet: CaseSetApi(),
    expectedResult: ExpectedResultApi(),
    execution: ExecutionApi(),
    case: CaseApi(),
    caseLog: CaseLogApi(),
  };
};

export default api;
