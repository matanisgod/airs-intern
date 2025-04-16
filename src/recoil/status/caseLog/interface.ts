export interface CaseLog {
  caseName: string;
  result: string;
  createdAt: string;
  caseId: string;
  expectedResultId: string;
  executionLogId: string;
}

export type CaseLogs = Array<CaseLog>;
