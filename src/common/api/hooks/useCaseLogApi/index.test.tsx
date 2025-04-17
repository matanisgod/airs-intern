import { renderHook, act } from '@testing-library/react';

import { useCaseLogApi } from './index';

import { api } from '@common/api';
import type { CaseLog, CaseLogs, Detail, Details } from '@recoil';
import { logAxiosError, useErrorSetter } from '@utils';

jest.mock('@common/api');
jest.mock('@utils', () => ({
  logAxiosError: jest.fn(),
  useErrorSetter: jest.fn(() => jest.fn()),
}));

describe('useCaseLogApi', () => {
  const mockGetGroupedCaseLogsById = jest.fn();
  const mockGetDetailsById = jest.fn();

  const mockError = new Error('error');
  const setErrorMock = jest.fn();

  beforeEach(() => {
    (useErrorSetter as jest.Mock).mockReturnValue(setErrorMock);
    (api as jest.Mock).mockReturnValue({
      caseLog: {
        getGroupedCaseLogsById: mockGetGroupedCaseLogsById,
        getDetailsById: mockGetDetailsById,
      },
    });
  });
  //TODO: change this
  const mockCaseLog: CaseLog = {
    caseName: 'name',
    result: 'result1',
    createdAt: 'time',
    caseId: 'id1',
    expectedResultId: 'id2',
    executionLogId: 'id3',
  };

  const mockCaseLogs: CaseLogs = [mockCaseLog];

  const mockDetail: Detail = {
    result: 'result2',
    resultLog: 'log',
    actualResult: 'actual',
    expectedResult: {
      data: 'expected',
    },
    checkType: 'check',
  };

  const mockDetails: Details = [mockDetail];
  it('getGroupedCaseLogsById', async () => {
    mockGetGroupedCaseLogsById.mockResolvedValue({ data: mockCaseLogs });

    const { result } = renderHook(() => useCaseLogApi());

    const post = await act(
      async () => await result.current?.getGroupedCaseLogsById({ executionId: 'id' }),
    );

    expect(mockGetGroupedCaseLogsById).toHaveBeenCalledWith({ executionId: 'id' });
    expect(post).toEqual(mockCaseLogs);
  });
  it('getDetailsById', async () => {
    mockGetDetailsById.mockResolvedValue({ data: mockDetails });

    const { result } = renderHook(() => useCaseLogApi());

    const post = await act(
      async () =>
        await result.current?.getDetailsById({
          executionLogId: 'id3',
          caseId: 'id1',
          expectedResultId: 'id2',
        }),
    );

    expect(mockGetDetailsById).toHaveBeenCalledWith({
      executionLogId: 'id3',
      caseId: 'id1',
      expectedResultId: 'id2',
    });
    expect(post).toEqual(mockDetails);
  });
  it('getGroupedCaseLogsById error', async () => {
    mockGetGroupedCaseLogsById.mockRejectedValue(mockError);

    const { result } = renderHook(() => useCaseLogApi());

    const post = await act(
      async () => await result.current?.getGroupedCaseLogsById({ executionId: 'id' }),
    );

    expect(post).toBeUndefined();
    expect(logAxiosError).toHaveBeenCalledWith(mockError);
    expect(setErrorMock).toHaveBeenCalledWith(mockError);
  });
  it('getDetailsById error', async () => {
    mockGetDetailsById.mockRejectedValue(mockError);

    const { result } = renderHook(() => useCaseLogApi());

    const post = await act(
      async () =>
        await result.current?.getDetailsById({
          executionLogId: 'id3',
          caseId: 'id1',
          expectedResultId: 'id2',
        }),
    );

    expect(post).toBeUndefined();
    expect(logAxiosError).toHaveBeenCalledWith(mockError);
    expect(setErrorMock).toHaveBeenCalledWith(mockError);
  });
});
