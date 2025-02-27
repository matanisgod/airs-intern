import type { ExpectedResults } from '@recoil/status';

export type UseExpectedResultApi = {
  getExpectedResultById: (params: string) => Promise<ExpectedResults | undefined>;
} | null;

export interface AxiosExpectedResultReturn {
  getExpectedResultById: (params: string) => Promise<ExpectedResults>;
}
