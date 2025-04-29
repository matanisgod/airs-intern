import type { CaseSets, CaseSet } from '@recoil';

export interface AxiosCaseSetReturn {
  importCaseSet: (body: FormData) => Promise<ImportCaseSetResBody>;
  getCaseSets: () => Promise<GetCaseSetsResBody>;
}
export interface ImportCaseSetResBody {
  message: string;
  data: CaseSet;
}
export interface GetCaseSetsResBody {
  message: string;
  data: CaseSets;
}
