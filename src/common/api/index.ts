import CaseSetApi, { type AxiosCaseSetReturn } from '@/common/api/routes/caseSet';
import ExecutionApi, { type AxiosExecutionReturn } from '@/common/api/routes/execution';
type ApiObject = {
  caseSet: AxiosCaseSetReturn;
  execution: AxiosExecutionReturn;
};

const api = (): ApiObject => {
  return {
    caseSet: CaseSetApi(),
    execution: ExecutionApi(),
  };
};

export default api;
