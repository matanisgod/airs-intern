import type { ExecutionLogs } from '@recoil/status';

export type UseExecutionApi = {
  getExecutionLog: () => Promise<ExecutionLogs | undefined>;
  postExecution: () => Promise<ExecutionLogs | undefined>;
  cancelExecution: () => Promise<ExecutionLogs | undefined>;
  cancelExecutionById: (params) => Promise<ExecutionLogs | undefined>;
} | null;

export interface AxiosExecutionReturn {
  getExecutionLog: () => Promise<GetExecutionLogResBody>;
  postExecution: () => Promise<ExecutionLogs>;
  cancelExecution: () => Promise<ExecutionLogs>;
  cancelExecutionById: (params) => Promise<ExecutionLogs>;
}

export interface GetExecutionLogResBody {
  message: string;
  data: ExecutionLogs;
}
