import type { Cases } from '@recoil';

export interface AxiosCaseReturn {
  getCasesByCaseSetId: (params: string) => Promise<GetCasesByCaseSetIdResBody>;
}
export interface GetCasesByCaseSetIdResBody {
  message: string;
  data: Cases;
}
