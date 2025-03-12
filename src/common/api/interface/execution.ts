import type { ExecutionForm } from '@containers';
import type { ExecutionLogs, ExecutionLog } from '@recoil/status';

export type UseExecutionApi = {
  getExecutionLogs: () => Promise<ExecutionLogs | undefined>;
  createExecution: (body: ExecutionForm) => Promise<ExecutionLog | undefined>;
  cancelExecution: () => Promise<ExecutionLog | undefined>;
  cancelExecutionById: (params: string) => Promise<ExecutionLog | undefined>;
} | null;

export interface AxiosExecutionReturn {
  getExecutionLogs: () => Promise<ExecutionLogsResBody>;
  createExecution: (body: ExecutionForm) => Promise<PostExecutionLogsResBody>;
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
