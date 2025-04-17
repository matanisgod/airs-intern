import { CaseApi } from './index';

import axiosDecorator from '@common/axios/axiosDecorator';

jest.mock('@common/axios/axiosDecorator');

describe('case', () => {
  const mockGet = jest.fn();
  const mockInstance = { get: mockGet };

  beforeEach(() => {
    (axiosDecorator.create as jest.Mock).mockReturnValue(mockInstance);
  });

  it('getCasesByCaseSetId', async () => {
    const api = CaseApi();
    await api.getCasesByCaseSetId('id');

    expect(axiosDecorator.create).toHaveBeenCalledWith({ url: '/case' });
    expect(mockGet).toHaveBeenCalledWith('/case_set/id');
  });
});
