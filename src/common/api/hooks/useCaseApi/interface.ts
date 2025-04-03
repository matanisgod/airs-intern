import { Cases } from '@recoil';

export type UseCaseApi = {
  getCasesByCaseSetId: (params: string) => Promise<Cases | undefined>;
} | null;
