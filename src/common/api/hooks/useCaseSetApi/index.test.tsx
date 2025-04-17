import { renderHook, act } from '@testing-library/react';

import { useCaseSetApi } from './index';

import { api } from '@common/api';
import type { CaseSets, CaseSet } from '@recoil';
import { logAxiosError, useErrorSetter } from '@utils';

jest.mock('@common/api');
jest.mock('@utils', () => ({
  logAxiosError: jest.fn(),
  useErrorSetter: jest.fn(() => jest.fn()),
}));

describe('useCaseSetApi', () => {
  const mockImportCaseSet = jest.fn();
  const mockGetCaseSets = jest.fn();

  const mockError = new Error('error');
  const setErrorMock = jest.fn();

  beforeEach(() => {
    (useErrorSetter as jest.Mock).mockReturnValue(setErrorMock);
    (api as jest.Mock).mockReturnValue({
      caseSet: {
        importCaseSet: mockImportCaseSet,
        getCaseSets: mockGetCaseSets,
      },
    });
  });

  const mockFormData = new FormData();

  const mockCaseSet: CaseSet = {
    type: 'type',
    title: 'title',
    id: 'id1',
    cases: [{ id: 'id2', name: 'name', data: '' }],
  };

  const mockCaseSets: CaseSets = [mockCaseSet];

  it('importCaseSet', async () => {
    mockImportCaseSet.mockResolvedValue({ data: mockCaseSet });

    const { result } = renderHook(() => useCaseSetApi());

    const post = await act(async () => await result.current?.importCaseSet(mockFormData));

    expect(mockImportCaseSet).toHaveBeenCalledWith(mockFormData);
    expect(post).toEqual(mockCaseSet);
  });

  it('getCaseSets', async () => {
    mockGetCaseSets.mockResolvedValue({ data: mockCaseSets });

    const { result } = renderHook(() => useCaseSetApi());

    const get = await act(async () => await result.current?.getCaseSets());

    expect(mockGetCaseSets).toHaveBeenCalled();
    expect(get).toEqual(mockCaseSets);
  });

  it('importCaseSet error', async () => {
    mockImportCaseSet.mockRejectedValue(mockError);

    const { result } = renderHook(() => useCaseSetApi());

    const post = await act(async () => await result.current?.importCaseSet(mockFormData));

    expect(post).toBeUndefined();
    expect(logAxiosError).toHaveBeenCalledWith(mockError);
    expect(setErrorMock).toHaveBeenCalledWith(mockError);
  });

  it('getCaseSets error', async () => {
    mockGetCaseSets.mockRejectedValue(mockError);

    const { result } = renderHook(() => useCaseSetApi());

    const get = await act(async () => await result.current?.getCaseSets());

    expect(get).toBeUndefined();
    expect(logAxiosError).toHaveBeenCalledWith(mockError);
    expect(setErrorMock).toHaveBeenCalledWith(mockError);
  });
});
