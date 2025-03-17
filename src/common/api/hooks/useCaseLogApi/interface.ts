import type { CaseLogs, Details } from '@recoil/status';

export type UseCaseLogApi = {
  getDistinctCaseLogsById: (
    body: GetDistinctCaseLogsByIdReqBody,
  ) => Promise<CaseLogs | undefined>;
  getDetailsById: (body: GetDetailsByIdReqBody) => Promise<Details | undefined>;
} | null;
export interface GetDistinctCaseLogsByIdReqBody {
  executionId: string;
}
export interface GetDetailsByIdReqBody {
  executionLogId: string;
  caseId: string;
  expectedResultId: string;
}
