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

const api = (accessToken: string, config?: ApiCustomConfig): ApiObject => {
  const apiUrl = config?.apiUrl;
  // const timeout = config?.timeout;
  const headers = {
    Authorization: `Bearer ${accessToken || ' '}`,
  };

  return {
    caseSet: CaseSetApi({ apiUrl, headers }),
    execution: ExecutionApi({ apiUrl, headers }),
  };
};

export default api;
