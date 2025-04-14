import type { CaseLogs, Details } from '@recoil';

export type UseCaseLogApi = {
  getGroupedCaseLogsById: (
    body: GetGroupedCaseLogsByIdReqBody,
  ) => Promise<CaseLogs | undefined>;
  getDetailsById: (body: GetDetailsByIdReqBody) => Promise<Details | undefined>;
} | null;
export interface GetGroupedCaseLogsByIdReqBody {
  executionId: string;
}
export interface GetDetailsByIdReqBody {
  executionLogId: string;
  caseId: string;
  expectedResultId: string;
}
