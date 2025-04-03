interface Detail {
  result: boolean;
  resultLog: string;
  actualResult: string;
  expectedResult: detailExpectedResult;
}
interface detailExpectedResult {
  data: string;
}
export type Details = Array<Detail>;
