import { caseSetForm } from '@containers';
import type { CaseSets, CaseSet } from '@recoil/status';

export type UseCaseSetApi = {
  importCaseSet: (body: caseSetForm) => Promise<CaseSet | undefined>;
  getCaseSets: () => Promise<CaseSets | undefined>;
} | null;
