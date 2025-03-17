interface CaseLog {
  name: string;
  caseId: string;
  createdAt: string;
  result: boolean;
  resultLog: string;
  executionLogId: string;
  expectedResultId: string;
}

export type CaseLogs = Array<CaseLog>;
