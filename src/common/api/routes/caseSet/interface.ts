import { caseSetForm } from '@containers';
import type { CaseSets, CaseSet } from '@recoil/status';

export interface AxiosCaseSetReturn {
  importCaseSet: (body: caseSetForm) => Promise<ImportCaseSetResBody>; //TODO: 변수명 변경
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
