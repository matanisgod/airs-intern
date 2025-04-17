import { renderHook, act } from '@testing-library/react';

import { useExpectedResultApi } from './index';

import { api } from '@common/api';
import type { ExpectedResult, ExpectedResults } from '@recoil';
import { logAxiosError, useErrorSetter } from '@utils';

jest.mock('@common/api');
jest.mock('@utils', () => ({
  logAxiosError: jest.fn(),
  useErrorSetter: jest.fn(() => jest.fn()),
}));

describe('useExpectedResultApi', () => {
  const mockGetExpectedResultById = jest.fn();

  const mockError = new Error('error');
  const setErrorMock = jest.fn();

  beforeEach(() => {
    (useErrorSetter as jest.Mock).mockReturnValue(setErrorMock);
    (api as jest.Mock).mockReturnValue({
      expectedResult: {
        getExpectedResultById: mockGetExpectedResultById,
      },
    });
  });

  const mockExpectedResult: ExpectedResult = {
    id: 'id',
    name: 'junha',
    version: '1.1.1',
    data: '',
  };

  const mockExpectedResults: ExpectedResults = [mockExpectedResult];

  it('getExpectedResultById', async () => {
    mockGetExpectedResultById.mockResolvedValue({ data: mockExpectedResults });

    const { result } = renderHook(() => useExpectedResultApi());

    const post = await act(
      async () => await result.current?.getExpectedResultById('idid'),
    );

    expect(mockGetExpectedResultById).toHaveBeenCalledWith('idid');
    expect(post).toEqual(mockExpectedResults);
  });

  it('getExpectedResultById error', async () => {
    mockGetExpectedResultById.mockRejectedValue(mockError);

    const { result } = renderHook(() => useExpectedResultApi());

    const post = await act(
      async () => await result.current?.getExpectedResultById('ididid'),
    );

    expect(post).toBeUndefined();
    expect(logAxiosError).toHaveBeenCalledWith(mockError);
    expect(setErrorMock).toHaveBeenCalledWith(mockError);
  });
});
