import { type ExecutionLog } from '@recoil/status';

export type UseExecutionApi = {
  postExecution: () => Promise<ExecutionLog | undefined>;
  cancelExecution: () => Promise<ExecutionLog | undefined>;
  cancelExecutionById: (params) => Promise<ExecutionLog | undefined>;
} | null;

export interface AxiosExecutionReturn {
  postExecution: () => Promise<ExecutionLog>;
  cancelExecution: () => Promise<ExecutionLog>;
  cancelExecutionById: (params) => Promise<ExecutionLog>;
}
