interface caseLog {
  name: string;
  caseId: string;
  createdAt: string;
  result: boolean;
  resultLog: string;
}

export type CaseLogs = Array<caseLog>;
