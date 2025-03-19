import type { CaseSets, CaseSet } from '@recoil/status';

export type UseCaseSetApi = {
  importCaseSet: (body: FormData) => Promise<CaseSet | undefined>;
  getCaseSets: () => Promise<CaseSets | undefined>;
} | null;

export type ImportCaseSetReqBody = FormData;
