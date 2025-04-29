import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import * as recoil from 'recoil';

import { CaseTable } from './index';

import { useExpectedResultApi } from '@common/api';
import { Case, casesAtom, ExpectedResult, idAtom } from '@recoil';

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
  const mockResetCaseId = jest.fn();
  const mockResetExpectedResults = jest.fn();
  const mockResetCaseJson = jest.fn();

  const mockCase: Case = {
    id: 'didi',
    name: 'lee',
    data: '{"name": "lee"}',
  };
  const mockCases = [mockCase];
  const mockExpectedResult: ExpectedResult = {
    id: 'idid',
    name: 'junha',
    version: '2.2.2',
    data: '',
  };
  const mockExpectedResults = [mockExpectedResult];
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
      if (atom.key === 'caseJsonAtom') {
        return mockResetCaseJson;
      }
      if (atom.key === 'expectedResultsAtom') {
        return mockResetExpectedResults;
      }
      if (atom === idAtom('caseId')) {
        return mockResetCaseId;
      }
      return jest.fn();
    });

    jest.spyOn(recoil, 'useRecoilValue').mockImplementation((atom) => {
      if (atom.key === 'casesAtom') {
        return mockCases;
      }
      return null;
    });

    (useExpectedResultApi as jest.Mock).mockReturnValue({
      getExpectedResultsById: jest.fn().mockResolvedValue(mockExpectedResults),
    });
  });
  const renderComponent = (initialValue: string = '') =>
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(casesAtom, mockCases);
          if (initialValue !== '') {
            set(idAtom('caseId'), initialValue);
          }
        }}
      >
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
      expect(useExpectedResultApi()?.getExpectedResultsById).toHaveBeenCalledWith('didi');
      expect(mockSetExpectedResults).toHaveBeenCalledWith(mockExpectedResults);
      expect(mockSetCaseJson).toHaveBeenCalledWith({ name: 'lee' });
      expect(mockResetCaseExpectedResultJson).toHaveBeenCalled();
    });
  });

  it('caseId === params.row.id && event.ctrlKey', async () => {
    renderComponent('didi');

    fireEvent.click(screen.getByText('lee'), { ctrlKey: true });

    await waitFor(() => {
      expect(mockResetCaseExpectedResultJson).toHaveBeenCalled();
      expect(mockResetCaseJson).toHaveBeenCalled();
      expect(mockResetCaseId).toHaveBeenCalled();
      expect(mockResetExpectedResults).toHaveBeenCalled();
    });
  });

  it('caseId === params.row.id && !event.ctrlKey', async () => {
    renderComponent('didi');

    fireEvent.click(screen.getByText('lee'), { ctrlKey: false });

    await waitFor(() => {
      expect(useExpectedResultApi()?.getExpectedResultsById).not.toHaveBeenCalled();
      expect(mockSetExpectedResults).not.toHaveBeenCalled();
      expect(mockSetCaseJson).not.toHaveBeenCalled();
      expect(mockResetCaseExpectedResultJson).not.toHaveBeenCalled();
    });
  });
});
