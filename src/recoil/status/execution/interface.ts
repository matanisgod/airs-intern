export type StatusType = 'running' | 'canceled' | 'error' | 'done';

export interface ExecutionLog {
  performer: string;
  createdAt: string;
  updatedAt: string;
  status: StatusType;
}
export type ExecutionLogs = Array<ExecutionLog>;
