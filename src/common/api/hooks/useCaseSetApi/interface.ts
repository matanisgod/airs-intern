import { CaseSetForm } from '@containers';
import type { CaseSets, CaseSet } from '@recoil/status';

export type UseCaseSetApi = {
  importCaseSet: (body: CaseSetForm) => Promise<CaseSet | undefined>;
  getCaseSets: () => Promise<CaseSets | undefined>;
} | null;

export type ImportCaseSetReqBody = CaseSetForm;
