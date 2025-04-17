import { CaseSetApi } from './index';

import axiosDecorator from '@common/axios/axiosDecorator';

jest.mock('@common/axios/axiosDecorator');

describe('caseSet', () => {
  const mockPost = jest.fn();
  const mockGet = jest.fn();
  const mockInstance = { post: mockPost, get: mockGet };

  beforeEach(() => {
    (axiosDecorator.create as jest.Mock).mockReturnValue(mockInstance);
  });

  it('importCaseSet', async () => {
    const api = CaseSetApi();
    const mockFormData = new FormData();
    mockFormData.append('a', 'b');

    await api.importCaseSet(mockFormData);

    expect(axiosDecorator.create).toHaveBeenCalledWith({ url: '/' });
    expect(mockPost).toHaveBeenCalledWith('casesets:import', mockFormData);
  });

  it('getCaseSets', async () => {
    const api = CaseSetApi();

    await api.getCaseSets();

    expect(axiosDecorator.create).toHaveBeenCalledWith({ url: '/' });
    expect(mockGet).toHaveBeenCalledWith('casesets');
  });
});
