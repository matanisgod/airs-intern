import { renderHook, act } from '@testing-library/react';

import { useExecutionApi } from './index';

import api from '@common/api';
import type { ExecutionForm } from '@containers';
import type { ExecutionLog, ExecutionLogs } from '@recoil';
import { logAxiosError, useErrorSetter } from '@utils';

jest.mock('@common/api');
jest.mock('@utils', () => ({
  logAxiosError: jest.fn(),
  useErrorSetter: jest.fn(() => jest.fn()),
}));

describe('useExecutionApi', () => {
  const mockGetExecutionLogs = jest.fn();
  const mockCreateExecution = jest.fn();
  const mockCancelExecution = jest.fn();
  const mockCancelExecutionById = jest.fn();

  const mockError = new Error('error');
  const setErrorMock = jest.fn();

  beforeEach(() => {
    (useErrorSetter as jest.Mock).mockReturnValue(setErrorMock);
    (api as jest.Mock).mockReturnValue({
      execution: {
        getExecutionLogs: mockGetExecutionLogs,
        createExecution: mockCreateExecution,
        cancelExecution: mockCancelExecution,
        cancelExecutionById: mockCancelExecutionById,
      },
    });
  });

  const mockExecutionForm: ExecutionForm = {
    testSets: ['smoke'],
    version: '1.0.0',
    description: 'desc',
    testPerformer: 'jun',
    gatePcIp: '1.1.1.1',
    dcsApiPort: 2222,
    dcsDicomPort: 3333,
    hospitalRealm: 'guui',
    keycloakUrl: 'https://example.com',
    keycloakLoginId: 'idid',
    keycloakLoginPw: 'pwpw',
  };

  const mockExecutionLog: ExecutionLog = {
    performer: 'junha',
    createdAt: '0114',
    status: 'running',
    id: 'matan',
  };

  const mockExecutionLogs: ExecutionLogs = [mockExecutionLog];

  it('getExecutionLogs', async () => {
    mockGetExecutionLogs.mockResolvedValue({ data: mockExecutionLogs });

    const { result } = renderHook(() => useExecutionApi());

    const get = await act(async () => await result.current?.getExecutionLogs());

    expect(mockGetExecutionLogs).toHaveBeenCalled();
    expect(get).toEqual(mockExecutionLogs);
  });

  it('createExecution', async () => {
    mockCreateExecution.mockResolvedValue({ data: mockExecutionLog });

    const { result } = renderHook(() => useExecutionApi());

    const post = await act(
      async () => await result.current?.createExecution(mockExecutionForm),
    );

    expect(mockCreateExecution).toHaveBeenCalledWith(mockExecutionForm);
    expect(post).toEqual(mockExecutionLog);
  });

  it('cancelExecution', async () => {
    mockCancelExecution.mockResolvedValue({ data: mockExecutionLog });

    const { result } = renderHook(() => useExecutionApi());

    const post = await act(async () => await result.current?.cancelExecution());

    expect(mockCancelExecution).toHaveBeenCalled();
    expect(post).toEqual(mockExecutionLog);
  });

  it('cancelExecutionById', async () => {
    mockCancelExecutionById.mockResolvedValue({ data: mockExecutionLog });

    const { result } = renderHook(() => useExecutionApi());

    const post = await act(
      async () => await result.current?.cancelExecutionById('idididid'),
    );

    expect(mockCancelExecutionById).toHaveBeenCalledWith('idididid');
    expect(post).toEqual(mockExecutionLog);
  });

  it('getExecutionLogs error', async () => {
    mockGetExecutionLogs.mockRejectedValue(mockError);

    const { result } = renderHook(() => useExecutionApi());

    const get = await act(async () => await result.current?.getExecutionLogs());

    expect(get).toBeUndefined();
    expect(logAxiosError).toHaveBeenCalledWith(mockError);
    expect(setErrorMock).toHaveBeenCalledWith(mockError);
  });

  it('createExecution error', async () => {
    mockCreateExecution.mockRejectedValue(mockError);

    const { result } = renderHook(() => useExecutionApi());

    const post = await act(
      async () => await result.current?.createExecution(mockExecutionForm),
    );

    expect(post).toBeUndefined();
    expect(logAxiosError).toHaveBeenCalledWith(mockError);
    expect(setErrorMock).toHaveBeenCalledWith(mockError);
  });

  it('cancelExecution error', async () => {
    mockCancelExecution.mockRejectedValue(mockError);

    const { result } = renderHook(() => useExecutionApi());

    const post = await act(async () => await result.current?.cancelExecution());

    expect(post).toBeUndefined();
    expect(logAxiosError).toHaveBeenCalledWith(mockError);
    expect(setErrorMock).toHaveBeenCalledWith(mockError);
  });

  it('cancelExecutionById error', async () => {
    mockCancelExecutionById.mockRejectedValue(mockError);

    const { result } = renderHook(() => useExecutionApi());

    const post = await act(
      async () => await result.current?.cancelExecutionById('idididid'),
    );

    expect(post).toBeUndefined();
    expect(logAxiosError).toHaveBeenCalledWith(mockError);
    expect(setErrorMock).toHaveBeenCalledWith(mockError);
  });
});
