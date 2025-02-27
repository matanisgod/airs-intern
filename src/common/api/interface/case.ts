import type { Cases } from '@recoil/status';

export type UseCaseApi = {
  getCasesByCaseSetId: (params: string) => Promise<Cases | undefined>;
} | null;

export interface AxiosCaseReturn {
  getCasesByCaseSetId: (params: string) => Promise<Cases>;
}
