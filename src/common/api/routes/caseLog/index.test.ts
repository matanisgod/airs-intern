import { CaseLogApi } from './index';

import axiosDecorator from '@common/axios/axiosDecorator';

jest.mock('@common/axios/axiosDecorator');

describe('caseLog', () => {
  const mockPost = jest.fn();
  const mockInstance = { post: mockPost };

  beforeEach(() => {
    (axiosDecorator.create as jest.Mock).mockReturnValue(mockInstance);
  });

  it('getGroupedCaseLogsById', async () => {
    const api = CaseLogApi();
    const mockBody = { executionId: 'id1' };

    await api.getGroupedCaseLogsById(mockBody);

    expect(axiosDecorator.create).toHaveBeenCalledWith({ url: '/case_log' });
    expect(mockPost).toHaveBeenCalledWith('/grouped', mockBody);
  });

  it('getDetailsById', async () => {
    const api = CaseLogApi();
    const mockBody = {
      executionLogId: 'id2',
      caseId: 'id3',
      expectedResultId: 'id4',
    };

    await api.getDetailsById(mockBody);

    expect(axiosDecorator.create).toHaveBeenCalledWith({ url: '/case_log' });
    expect(mockPost).toHaveBeenCalledWith('/details', mockBody);
  });
});
