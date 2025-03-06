type StatusType = 'running' | 'cancelled' | 'error' | 'done';

interface ExecutionLog {
  performer: string;
  createdAt: string;
  status: StatusType;
  id: string;
}
export type ExecutionLogs = Array<ExecutionLog>;
