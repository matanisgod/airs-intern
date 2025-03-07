import type { ExecutionLogs, ExecutionLog } from '@recoil/status';

export type UseExecutionApi = {
  getExecutionLogs: () => Promise<ExecutionLogs | undefined>;
  createExecution: (body: object) => Promise<ExecutionLog | undefined>;
  cancelExecution: () => Promise<ExecutionLog | undefined>;
  cancelExecutionById: (params: string) => Promise<ExecutionLog | undefined>;
} | null;

export interface AxiosExecutionReturn {
  getExecutionLogs: () => Promise<ExecutionLogsResBody>;
  createExecution: (body: object) => Promise<PostExecutionLogsResBody>;
  cancelExecution: () => Promise<PostExecutionLogsResBody>;
  cancelExecutionById: (params: string) => Promise<PostExecutionLogsResBody>;
}

export interface ExecutionLogsResBody {
  message: string;
  data: ExecutionLogs;
}

export interface PostExecutionLogsResBody {
  message: string;
  data: ExecutionLog;
}
