import {
  CaseApi,
  CaseSetApi,
  ExecutionApi,
  ExpectedResultApi,
  CaseLogApi,
  type AxiosCaseSetReturn,
  type AxiosExpectedResultReturn,
  type AxiosExecutionReturn,
  type AxiosCaseReturn,
  type AxiosCaseLogReturn,
} from '@common/api';

export * from './hooks';
export * from './routes';

export interface ApiObject {
  caseSet: AxiosCaseSetReturn;
  expectedResult: AxiosExpectedResultReturn;
  execution: AxiosExecutionReturn;
  case: AxiosCaseReturn;
  caseLog: AxiosCaseLogReturn;
}

export const api = (): ApiObject => {
  return {
    caseSet: CaseSetApi(),
    expectedResult: ExpectedResultApi(),
    execution: ExecutionApi(),
    case: CaseApi(),
    caseLog: CaseLogApi(),
  };
};
