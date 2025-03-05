import type { ExecutionLogs } from '@recoil/status';

export type UseExecutionApi = {
  getExecutionLogs: () => Promise<ExecutionLogs | undefined>;
  postExecution: () => Promise<ExecutionLogs | undefined>;
  cancelExecution: () => Promise<ExecutionLogs | undefined>;
  cancelExecutionById: (params) => Promise<ExecutionLogs | undefined>;
} | null;

export interface AxiosExecutionReturn {
  getExecutionLogs: () => Promise<GetExecutionLogsResBody>;
  postExecution: () => Promise<ExecutionLogs>;
  cancelExecution: () => Promise<ExecutionLogs>;
  cancelExecutionById: (params) => Promise<ExecutionLogs>;
}

export interface GetExecutionLogsResBody {
  message: string;
  data: ExecutionLogs;
}
