import type { ExpectedResults } from '@recoil';

export interface AxiosExpectedResultReturn {
  getExpectedResultsById: (params: string) => Promise<GetExpectedResultByIdResBody>;
}

export interface GetExpectedResultByIdResBody {
  message: string;
  data: ExpectedResults;
}
