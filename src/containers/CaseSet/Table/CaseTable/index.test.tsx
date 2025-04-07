import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import * as recoil from 'recoil';

import { CaseTable } from './index';

import { useExpectedResultApi } from '@common/api';
import { casesAtom } from '@recoil';

jest.mock('@common/api', () => ({
  useExpectedResultApi: jest.fn(),
}));
jest.mock('@utils', () => ({
  logAxiosError: jest.fn(),
  useErrorSetter: jest.fn(() => jest.fn()),
}));

describe('CaseTable', () => {
  const mockSetExpectedResults = jest.fn();
  const mockSetCaseJson = jest.fn();
  const mockResetCaseExpectedResultJson = jest.fn();

  const mockCase = {
    id: 'didi',
    name: 'lee',
    data: '{"name": "lee"}',
  };
  const mockCases = [mockCase];
  const mockExpectedResult = { id: 'idid', name: 'junha', version: '2.2.2', data: {} };

  beforeEach(() => {
    jest.spyOn(recoil, 'useSetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'expectedResultsAtom') {
        return mockSetExpectedResults;
      }
      if (atom.key === 'caseJsonAtom') {
        return mockSetCaseJson;
      }
      return jest.fn();
    });

    jest.spyOn(recoil, 'useResetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'caseExpectedResultJsonAtom') {
        return mockResetCaseExpectedResultJson;
      }
      return jest.fn();
    });

    (useExpectedResultApi as jest.Mock).mockReturnValue({
      getExpectedResultById: jest.fn().mockResolvedValue(mockExpectedResult),
    });
  });

  const renderComponent = () =>
    render(
      <RecoilRoot initializeState={({ set }) => set(casesAtom, mockCases)}>
        <CaseTable />
      </RecoilRoot>,
    );

  it('DataTable', () => {
    renderComponent();
    expect(screen.getByText('lee')).toBeInTheDocument();
  });

  it('onRowClick', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('lee'));

    await waitFor(() => {
      expect(useExpectedResultApi()?.getExpectedResultById).toHaveBeenCalledWith('didi');
      expect(mockSetExpectedResults).toHaveBeenCalledWith(mockExpectedResult);
      expect(mockSetCaseJson).toHaveBeenCalledWith({ name: 'lee' });
      expect(mockResetCaseExpectedResultJson).toHaveBeenCalled();
    });
  });
});
