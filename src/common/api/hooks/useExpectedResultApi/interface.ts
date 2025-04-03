import type { ExpectedResults } from '@recoil';

export type UseExpectedResultApi = {
  getExpectedResultById: (params: string) => Promise<ExpectedResults | undefined>;
} | null;
