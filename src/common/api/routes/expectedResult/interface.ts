import type { ExpectedResults } from '@recoil';

export interface AxiosExpectedResultReturn {
  getExpectedResultById: (params: string) => Promise<GetExpectedResultByIdResBody>;
}

export interface GetExpectedResultByIdResBody {
  message: string;
  data: ExpectedResults;
}
