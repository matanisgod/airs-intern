import type { ExpectedResults } from '@recoil/status';

export interface AxiosExpectedResultReturn {
  getExpectedResultById: (params: string) => Promise<GetExpectedResultByIdResBody>;
}

export interface GetExpectedResultByIdResBody {
  message: string;
  data: ExpectedResults;
}
