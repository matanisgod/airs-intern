import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import * as recoil from 'recoil';

import { CaseSetTable } from './index';

import { useCaseApi, useCaseSetApi } from '@common/api';
import { Case, CaseSet, caseSetsAtom, idAtom } from '@recoil';

jest.mock('@common/api', () => ({
  useCaseApi: jest.fn(),
  useCaseSetApi: jest.fn(),
}));
jest.mock('@utils', () => ({
  logAxiosError: jest.fn(),
  useErrorSetter: jest.fn(),
}));

describe('CaseSetTable', () => {
  const mockSetCaseSets = jest.fn();
  const mockSetCases = jest.fn();
  const mockResetExpectedResults = jest.fn();
  const mockResetCaseJson = jest.fn();
  const mockResetCaseExpectedResultJson = jest.fn();
  const mockResetCaseSetId = jest.fn();
  const mockResetCases = jest.fn();

  const mockCaseSet: CaseSet = {
    type: 'type',
    title: 'title',
    id: 'idid',
    cases: [],
  };
  const mockCaseSets = [mockCaseSet];
  const mockCase: Case = {
    id: 'didi',
    name: 'lee',
    data: '{"name": "lee"}',
  };
  const mockCases = [mockCase];

  beforeEach(() => {
    jest.spyOn(recoil, 'useSetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'caseSetsAtom') {
        return mockSetCaseSets;
      }
      if (atom.key === 'casesAtom') {
        return mockSetCases;
      }
      return jest.fn();
    });

    jest.spyOn(recoil, 'useResetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'expectedResultsAtom') {
        return mockResetExpectedResults;
      }
      if (atom.key === 'caseJsonAtom') {
        return mockResetCaseJson;
      }
      if (atom.key === 'caseExpectedResultJsonAtom') {
        return mockResetCaseExpectedResultJson;
      }
      if (atom.key === 'casesAtom') {
        return mockResetCases;
      }
      if (atom === idAtom('caseSetId')) {
        return mockResetCaseSetId;
      }
      return jest.fn();
    });

    jest.spyOn(recoil, 'useRecoilValue').mockImplementation((atom) => {
      if (atom.key === 'caseSetsAtom') {
        return mockCaseSets;
      }
      return null;
    });

    (useCaseApi as jest.Mock).mockReturnValue({
      getCasesByCaseSetId: jest.fn().mockResolvedValue(mockCases),
    });

    (useCaseSetApi as jest.Mock).mockReturnValue({
      getCaseSets: jest.fn().mockResolvedValue(mockCaseSets),
    });
  });

  const renderComponent = (initialValue: string = '') =>
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(caseSetsAtom, mockCaseSets);
          if (initialValue !== '') {
            set(idAtom('caseSetId'), initialValue);
          }
        }}
      >
        <CaseSetTable />
      </RecoilRoot>,
    );

  it('DataTable', () => {
    renderComponent();
    expect(screen.getByText('title')).toBeInTheDocument();
  });

  it('onRowClick', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('title'));

    await waitFor(() => {
      expect(useCaseApi()?.getCasesByCaseSetId).toHaveBeenCalledWith('idid');
      expect(mockSetCases).toHaveBeenCalledWith(mockCases);
      expect(mockResetExpectedResults).toHaveBeenCalled();
      expect(mockResetCaseJson).toHaveBeenCalled();
      expect(mockResetCaseExpectedResultJson).toHaveBeenCalled();
    });
  });

  it('caseSetId === params.row.id && event.ctrlKey', async () => {
    renderComponent('idid');

    fireEvent.click(screen.getByText('title'), { ctrlKey: true });

    await waitFor(() => {
      expect(mockResetExpectedResults).toHaveBeenCalled();
      expect(mockResetCaseJson).toHaveBeenCalled();
      expect(mockResetCaseExpectedResultJson).toHaveBeenCalled();
      expect(mockResetCaseSetId).toHaveBeenCalled();
      expect(mockResetCases).toHaveBeenCalled();
    });
  });

  it('caseSetId === params.row.id && !event.ctrlKey', async () => {
    renderComponent('idid');

    fireEvent.click(screen.getByText('title'), { ctrlKey: false });

    await waitFor(() => {
      expect(useCaseApi()?.getCasesByCaseSetId).not.toHaveBeenCalledWith('id');
      expect(mockSetCases).not.toHaveBeenCalledWith(mockCases);
      expect(mockResetExpectedResults).not.toHaveBeenCalled();
      expect(mockResetCaseJson).not.toHaveBeenCalled();
      expect(mockResetCaseExpectedResultJson).not.toHaveBeenCalled();
    });
  });
  it('RefreshButton', async () => {
    renderComponent();

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(useCaseSetApi()?.getCaseSets).toHaveBeenCalled();
    });
  });
  it('CreateButton', async () => {
    renderComponent();

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    await waitFor(() => {
      expect(screen.getByText('Type')).toBeInTheDocument();
    });
  });
});
