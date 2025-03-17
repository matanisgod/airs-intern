import { GetDistinctCaseLogsByIdReqBody, GetDetailsByIdReqBody } from '@common/api';
import type { CaseLogs, Details } from '@recoil/status';

export interface AxiosCaseLogReturn {
  getDistinctCaseLogsById: (
    body: GetDistinctCaseLogsByIdReqBody,
  ) => Promise<GetDistinctCaseLogsByIdResBody>;
  getDetailsById: (body: GetDetailsByIdReqBody) => Promise<GetDetailsByIdResBody>;
}
export interface GetDistinctCaseLogsByIdResBody {
  message: string;
  data: CaseLogs;
}
export interface GetDetailsByIdResBody {
  message: string;
  data: Details;
}
