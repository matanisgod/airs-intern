import {
  AxiosCaseReturn,
  AxiosCaseSetReturn,
  AxiosExecutionReturn,
  AxiosExpectedResultReturn,
  AxiosCaseLogReturn,
} from './interface';

import {
  CaseApi,
  CaseSetApi,
  ExecutionApi,
  ExpectedResultApi,
  CaseLogApi,
} from '@common/api';

export * from './hooks';
export * from './interface';
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
