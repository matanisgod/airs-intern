type StatusType = 'running' | 'canceled' | 'error' | 'done';

interface ExecutionLog {
  performer: string;
  createdAt: string;
  status: StatusType;
  id: string;
}
export type ExecutionLogs = Array<ExecutionLog>;

interface caseLog {
  name: string;
  caseId: string;
  createdAt: string;
  result: boolean;
  resultLog: string;
}

export type CaseLogs = Array<caseLog>;
