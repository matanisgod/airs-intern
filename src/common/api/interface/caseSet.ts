import type { CaseSets } from '@recoil/status';

export type UseCaseSetApi = {
  importCaseSet: () => Promise<CaseSets | undefined>;
  getCaseSets: () => Promise<CaseSets | undefined>;
} | null;

export interface AxiosCaseSetReturn {
  importCaseSet: () => Promise<GetCaseSetsResBody>;
  getCaseSets: () => Promise<GetCaseSetsResBody>;
}
export interface GetCaseSetsResBody {
  message: string;
  data: CaseSets;
}
