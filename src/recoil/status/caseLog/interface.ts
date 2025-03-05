interface caseLog {
  name: string;
  caseId: string;
  createdAt: string;
  result: boolean;
  resultLog: Array<string>;
  executionLogId: string;
  expectedResultId: string;
}

export type CaseLogs = Array<caseLog>;
