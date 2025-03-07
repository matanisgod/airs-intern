import type { CaseSets } from '@recoil/status';

export type UseCaseSetApi = {
  importCaseSet: (body: object) => Promise<string | undefined>;
  getCaseSets: () => Promise<CaseSets | undefined>;
} | null;

export interface AxiosCaseSetReturn {
  importCaseSet: (body: object) => Promise<ImportCaseSetResBody>;
  getCaseSets: () => Promise<GetCaseSetsResBody>;
}
interface GetCaseSetsResBody {
  message: string;
  data: CaseSets;
}
interface ImportCaseSetResBody {
  message: string;
}
