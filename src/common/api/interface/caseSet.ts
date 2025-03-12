import { caseSetForm } from '@containers';
import type { CaseSets, CaseSet } from '@recoil/status';

export type UseCaseSetApi = {
  importCaseSet: (body: caseSetForm) => Promise<CaseSet | undefined>;
  getCaseSets: () => Promise<CaseSets | undefined>;
} | null;

export interface AxiosCaseSetReturn {
  importCaseSet: (body: caseSetForm) => Promise<ImportCaseSetResBody>;
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
