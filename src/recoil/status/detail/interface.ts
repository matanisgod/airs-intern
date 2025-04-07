export interface Detail {
  result: boolean;
  resultLog: string;
  actualResult: string;
  expectedResult: DetailExpectedResult;
}
interface DetailExpectedResult {
  data: string;
}
export type Details = Array<Detail>;
