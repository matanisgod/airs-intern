import { ExecutionApi } from './index';

import axiosDecorator from '@common/axios/axiosDecorator';

jest.mock('@common/axios/axiosDecorator');

describe('caseSet', () => {
  const mockPost = jest.fn();
  const mockGet = jest.fn();
  const mockInstance = { post: mockPost, get: mockGet };

  beforeEach(() => {
    (axiosDecorator.create as jest.Mock).mockReturnValue(mockInstance);
  });

  it('getExecutionLogs', async () => {
    const api = ExecutionApi();

    await api.getExecutionLogs();

    expect(axiosDecorator.create).toHaveBeenCalledWith({ url: '/' });
    expect(mockGet).toHaveBeenCalledWith('executions/');
  });

  it('createExecution', async () => {
    const api = ExecutionApi();
    const mockBody = {
      testSets: ['a'],
      version: 'b',
      description: 'c',
      testPerformer: 'd',
      gatePcIp: 'e',
      dcsApiPort: undefined,
      dcsDicomPort: undefined,
      hospitalRealm: 'f',
      keycloakUrl: 'g',
      keycloakLoginId: 'h',
      keycloakLoginPw: 'i',
    };

    await api.createExecution(mockBody);

    expect(axiosDecorator.create).toHaveBeenCalledWith({ url: '/' });
    expect(mockPost).toHaveBeenCalledWith('executions/', mockBody);
  });
  it('cancelExecution', async () => {
    const api = ExecutionApi();

    await api.cancelExecution();

    expect(axiosDecorator.create).toHaveBeenCalledWith({ url: '/' });
    expect(mockPost).toHaveBeenCalledWith('executions:cancel');
  });
  it('cancelExecutionById', async () => {
    const api = ExecutionApi();

    await api.cancelExecutionById('id');

    expect(axiosDecorator.create).toHaveBeenCalledWith({ url: '/' });
    expect(mockPost).toHaveBeenCalledWith('executions/id:cancel');
  });
});
