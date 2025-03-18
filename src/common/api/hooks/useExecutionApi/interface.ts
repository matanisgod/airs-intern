import type { ExecutionForm } from '@containers';
import type { ExecutionLogs, ExecutionLog } from '@recoil/status';

export type UseExecutionApi = {
  getExecutionLogs: () => Promise<ExecutionLogs | undefined>;
  createExecution: (body: ExecutionForm) => Promise<ExecutionLog | undefined>;
  cancelExecution: () => Promise<ExecutionLog | undefined>;
  cancelExecutionById: (params: string) => Promise<ExecutionLog | undefined>;
} | null;

export type CreateExecutionReqBody = ExecutionForm;
