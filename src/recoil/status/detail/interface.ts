interface Detail {
  result: boolean;
  resultLog: Array<string>;
  actualResult: object;
  expectedResult: detailExpectedResult;
}
interface detailExpectedResult {
  data: object;
}
export type Details = Array<Detail>;
