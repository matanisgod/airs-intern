import type { CaseLogs } from '@recoil/status';

export type UseCaseLogApi = {
  getDistinctCaseLogsById: (body: object) => Promise<CaseLogs | undefined>;
} | null;

export interface AxiosCaseLogReturn {
  getDistinctCaseLogsById: (body: object) => Promise<GetDistinctCaseLogsByIdResBody>;
}
export interface GetDistinctCaseLogsByIdResBody {
  message: string;
  data: CaseLogs;
}
