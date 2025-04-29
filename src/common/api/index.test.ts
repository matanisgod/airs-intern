import {
  CaseSetApi,
  ExpectedResultApi,
  ExecutionApi,
  CaseApi,
  CaseLogApi,
} from './routes';

import {
  api,
  type AxiosCaseSetReturn,
  type AxiosExpectedResultReturn,
  type AxiosExecutionReturn,
  type AxiosCaseReturn,
  type AxiosCaseLogReturn,
} from './index';

jest.mock('./routes');

describe('api', () => {
  it('call factory', () => {
    const mockCaseSet: AxiosCaseSetReturn = {
      importCaseSet: jest.fn(),
      getCaseSets: jest.fn(),
    };
    const mockExpectedResult: AxiosExpectedResultReturn = {
      getExpectedResultsById: jest.fn(),
    };
    const mockExecution: AxiosExecutionReturn = {
      getExecutionLogs: jest.fn(),
      createExecution: jest.fn(),
      cancelExecution: jest.fn(),
      cancelExecutionById: jest.fn(),
    };
    const mockCase: AxiosCaseReturn = {
      getCasesByCaseSetId: jest.fn(),
    };
    const mockCaseLog: AxiosCaseLogReturn = {
      getGroupedCaseLogsById: jest.fn(),
      getDetailsById: jest.fn(),
    };

    (CaseSetApi as jest.Mock).mockReturnValue(mockCaseSet);
    (ExpectedResultApi as jest.Mock).mockReturnValue(mockExpectedResult);
    (ExecutionApi as jest.Mock).mockReturnValue(mockExecution);
    (CaseApi as jest.Mock).mockReturnValue(mockCase);
    (CaseLogApi as jest.Mock).mockReturnValue(mockCaseLog);

    const result = api();

    expect(CaseSetApi).toHaveBeenCalled();
    expect(ExpectedResultApi).toHaveBeenCalled();
    expect(ExecutionApi).toHaveBeenCalled();
    expect(CaseApi).toHaveBeenCalled();
    expect(CaseLogApi).toHaveBeenCalled();

    expect(result.caseSet).toBe(mockCaseSet);
    expect(result.expectedResult).toBe(mockExpectedResult);
    expect(result.execution).toBe(mockExecution);
    expect(result.case).toBe(mockCase);
    expect(result.caseLog).toBe(mockCaseLog);
  });
});
