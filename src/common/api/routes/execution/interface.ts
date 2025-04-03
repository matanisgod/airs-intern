import type { ExecutionForm } from '@containers';
import type { ExecutionLogs, ExecutionLog } from '@recoil';

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
