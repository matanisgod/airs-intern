import { GetGroupedCaseLogsByIdReqBody, GetDetailsByIdReqBody } from '@common/api';
import type { CaseLogs, Details } from '@recoil';

export interface AxiosCaseLogReturn {
  getGroupedCaseLogsById: (
    body: GetGroupedCaseLogsByIdReqBody,
  ) => Promise<GetGroupedCaseLogsByIdResBody>;
  getDetailsById: (body: GetDetailsByIdReqBody) => Promise<GetDetailsByIdResBody>;
}
export interface GetGroupedCaseLogsByIdResBody {
  message: string;
  data: CaseLogs;
}
export interface GetDetailsByIdResBody {
  message: string;
  data: Details;
}
