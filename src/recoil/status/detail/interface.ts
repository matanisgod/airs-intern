export interface Detail {
  result: string;
  resultLog: string;
  actualResult: string;
  expectedResult: DetailExpectedResult;
  checkType: string;
  id: string;
}
interface DetailExpectedResult {
  data: string;
}
export type Details = Array<Detail>;
