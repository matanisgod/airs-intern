export type StatusType = 'running' | 'canceled' | 'error' | 'done';

export interface ExecutionLog {
  performer: string;
  createdAt: string;
  status: StatusType;
  id: string;
}
export interface ExecutionLogs {
  message: string;
  data: Array<ExecutionLog>;
}
