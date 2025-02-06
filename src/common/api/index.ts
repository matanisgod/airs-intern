import CaseSetApi, { AxiosCaseSetReturn } from '@/common/api/routes/caseSet';
import ExecutionApi, { AxiosExecutionReturn } from '@/common/api/routes/execution';
type ApiObject = {
  caseSet: AxiosCaseSetReturn;
  execution: AxiosExecutionReturn;
};

type ApiCustomConfig =
  | {
      apiUrl?: string | undefined;
      timeout?: number | undefined;
    }
  | undefined;

const api = (config?: ApiCustomConfig): ApiObject => {
  const apiUrl = config?.apiUrl;
  // const timeout = config?.timeout;

  return {
    caseSet: CaseSetApi({ apiUrl }),
    execution: ExecutionApi({ apiUrl }),
  };
};

export default api;
