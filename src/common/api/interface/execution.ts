import type { ExecutionLog, ExecutionLogs } from '@recoil/status';

export type UseExecutionApi = {
  getExecutionLog: () => Promise<ExecutionLogs | undefined>;
  postExecution: () => Promise<ExecutionLog | undefined>;
  cancelExecution: () => Promise<ExecutionLog | undefined>;
  cancelExecutionById: (params) => Promise<ExecutionLog | undefined>;
} | null;

export interface AxiosExecutionReturn {
  getExecutionLog: () => Promise<ExecutionLogs>;
  postExecution: () => Promise<ExecutionLog>;
  cancelExecution: () => Promise<ExecutionLog>;
  cancelExecutionById: (params) => Promise<ExecutionLog>;
}
