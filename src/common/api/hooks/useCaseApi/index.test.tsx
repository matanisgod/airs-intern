import { renderHook, act } from '@testing-library/react';

import { useCaseApi } from './index';

import { api } from '@common/api';
import type { Case, Cases } from '@recoil';
import { logAxiosError, useErrorSetter } from '@utils';

jest.mock('@common/api');
jest.mock('@utils', () => ({
  logAxiosError: jest.fn(),
  useErrorSetter: jest.fn(() => jest.fn()),
}));

describe('useCaseApi', () => {
  const mockGetCasesByCaseSetId = jest.fn();

  const mockError = new Error('error');
  const setErrorMock = jest.fn();

  beforeEach(() => {
    (useErrorSetter as jest.Mock).mockReturnValue(setErrorMock);
    (api as jest.Mock).mockReturnValue({
      case: {
        getCasesByCaseSetId: mockGetCasesByCaseSetId,
      },
    });
  });

  const mockCase: Case = {
    id: 'matan',
    name: 'junha',
    data: '0114',
  };

  const mockCases: Cases = [mockCase];

  it('getCasesByCaseSetId', async () => {
    mockGetCasesByCaseSetId.mockResolvedValue({ data: mockCases });

    const { result } = renderHook(() => useCaseApi());

    const get = await act(
      async () => await result.current?.getCasesByCaseSetId('caseSetId'),
    );

    expect(mockGetCasesByCaseSetId).toHaveBeenCalledWith('caseSetId');
    expect(get).toEqual(mockCases);
  });

  it('getCasesByCaseSetId error', async () => {
    mockGetCasesByCaseSetId.mockRejectedValue(mockError);

    const { result } = renderHook(() => useCaseApi());

    const get = await act(
      async () => await result.current?.getCasesByCaseSetId('caseSetId'),
    );

    expect(get).toBeUndefined();
    expect(logAxiosError).toHaveBeenCalledWith(mockError);
    expect(setErrorMock).toHaveBeenCalledWith(mockError);
  });
});
