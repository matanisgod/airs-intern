import { ExpectedResultApi } from './index';

import axiosDecorator from '@common/axios/axiosDecorator';

jest.mock('@common/axios/axiosDecorator');

describe('caseSet', () => {
  const mockGet = jest.fn();
  const mockInstance = { get: mockGet };

  beforeEach(() => {
    (axiosDecorator.create as jest.Mock).mockReturnValue(mockInstance);
  });

  it('getExpectedResultById', async () => {
    const api = ExpectedResultApi();

    await api.getExpectedResultById('id');

    expect(axiosDecorator.create).toHaveBeenCalledWith({ url: '/expected_result' });
    expect(mockGet).toHaveBeenCalledWith('/case/id');
  });
});
