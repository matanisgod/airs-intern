interface ExpectedResult {
  id: string;
  name: string;
  version: string;
  data: JSON;
}
export interface ExpectedResults {
  message: string;
  data: Array<ExpectedResult>;
}
