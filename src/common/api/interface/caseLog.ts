import type { CaseLogs, Details } from '@recoil/status';

export type UseCaseLogApi = {
  getDistinctCaseLogsById: (body: object) => Promise<CaseLogs | undefined>;
  getDetailsById: (body: object) => Promise<Details | undefined>;
} | null;

export interface AxiosCaseLogReturn {
  getDistinctCaseLogsById: (body: object) => Promise<GetDistinctCaseLogsByIdResBody>;
  getDetailsById: (body: object) => Promise<GetDetailsByIdResBody>;
}
export interface GetDistinctCaseLogsByIdResBody {
  message: string;
  data: CaseLogs;
}
export interface GetDetailsByIdResBody {
  message: string;
  data: Details;
}
