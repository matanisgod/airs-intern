import {
  type AxiosExpectedResultReturn,
  CaseSetApi,
  type AxiosCaseSetReturn,
  ExpectedResultApi,
} from '@/common/api/routes/caseSet';
import ExecutionApi, { type AxiosExecutionReturn } from '@/common/api/routes/execution';
type ApiObject = {
  caseSet: AxiosCaseSetReturn;
  expectedResult: AxiosExpectedResultReturn;
  execution: AxiosExecutionReturn;
};

const api = (): ApiObject => {
  return {
    caseSet: CaseSetApi(),
    expectedResult: ExpectedResultApi(),
    execution: ExecutionApi(),
  };
};

export default api;
