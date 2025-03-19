import type { CaseSets, CaseSet } from '@recoil/status';

export interface AxiosCaseSetReturn {
  importCaseSet: (body: FormData) => Promise<ImportCaseSetResBody>;
  getCaseSets: () => Promise<GetCaseSetsResBody>;
}
interface ImportCaseSetResBody {
  message: string;
  data: CaseSet;
}
interface GetCaseSetsResBody {
  message: string;
  data: CaseSets;
}
