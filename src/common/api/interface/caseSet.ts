import type { CaseSets } from '@recoil/status';

export type UseCaseSetApi = {
  importCaseSet: () => Promise<CaseSets | undefined>;
  getCaseSet: () => Promise<CaseSets | undefined>;
} | null;

export interface AxiosCaseSetReturn {
  importCaseSet: () => Promise<CaseSets>;
  getCaseSet: () => Promise<CaseSets>;
}
