import type { ExpectedResults } from '@recoil';

export type UseExpectedResultApi = {
  getExpectedResultsById: (params: string) => Promise<ExpectedResults | undefined>;
} | null;
