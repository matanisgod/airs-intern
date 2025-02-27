import { AxiosCaseReturn } from './interface/case';
import { AxiosCaseSetReturn } from './interface/caseSet';
import { AxiosExecutionReturn } from './interface/execution';
import { AxiosExpectedResultReturn } from './interface/expectedResult';

import { CaseApi } from '@/common/api/routes/case';
import { CaseSetApi } from '@/common/api/routes/caseSet';
import { ExecutionApi } from '@/common/api/routes/execution';
import { ExpectedResultApi } from '@/common/api/routes/expectedResult';

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
