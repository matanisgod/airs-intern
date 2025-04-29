import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import * as recoil from 'recoil';

import { ExpectedResultTable } from './index';

import { ExpectedResult, expectedResultsAtom, idAtom } from '@recoil';

jest.mock('@utils', () => ({
  logAxiosError: jest.fn(),
  useErrorSetter: jest.fn(() => jest.fn()),
}));

describe('ExpectedResultTable', () => {
  const mockSetCaseExpectedResultJson = jest.fn();
  const mockResetCaseExpectedResultJson = jest.fn();
  const mockResetExpectedResultsId = jest.fn();

  const mockExpectedResult: ExpectedResult = {
    name: 'lee',
    version: '1.1.1',
    data: '{"name": "lee"}',
    id: 'ididid',
  };
  const mockExpectedResults = [mockExpectedResult];

  beforeEach(() => {
    jest.spyOn(recoil, 'useSetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'caseExpectedResultJsonAtom') {
        return mockSetCaseExpectedResultJson;
      }
      return jest.fn();
    });

    jest.spyOn(recoil, 'useResetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'caseExpectedResultJsonAtom') {
        return mockResetCaseExpectedResultJson;
      }
      if (atom === idAtom('expectedResultId')) {
        return mockResetExpectedResultsId;
      }
      return jest.fn();
    });

    jest.spyOn(recoil, 'useRecoilValue').mockImplementation((atom) => {
      if (atom.key === 'expectedResultsAtom') {
        return mockExpectedResults;
      }
      return null;
    });
  });

  const renderComponent = (initialValue: string = '') =>
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(expectedResultsAtom, mockExpectedResults);
          if (initialValue !== '') {
            set(idAtom('expectedResultId'), initialValue);
          }
        }}
      >
        <ExpectedResultTable />
      </RecoilRoot>,
    );

  it('DataTable', () => {
    renderComponent();
    expect(screen.getByText('1.1.1')).toBeInTheDocument();
  });

  it('onRowClick', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('1.1.1'));

    await waitFor(() => {
      expect(mockSetCaseExpectedResultJson).toHaveBeenCalledWith({ name: 'lee' });
    });
  });

  it('caseSetId === params.row.id && event.ctrlKey', async () => {
    renderComponent('ididid');

    fireEvent.click(screen.getByText('1.1.1'), { ctrlKey: true });

    await waitFor(() => {
      expect(mockResetCaseExpectedResultJson).toHaveBeenCalled();
      expect(mockResetExpectedResultsId).toHaveBeenCalled();
    });
  });

  it('caseSetId === params.row.id && !event.ctrlKey', async () => {
    renderComponent('ididid');

    fireEvent.click(screen.getByText('1.1.1'), { ctrlKey: false });

    await waitFor(() => {
      expect(mockSetCaseExpectedResultJson).not.toHaveBeenCalled();
    });
  });
});
