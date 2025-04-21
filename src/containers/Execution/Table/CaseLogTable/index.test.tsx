import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import * as recoil from 'recoil';

import { CaseLogTable } from './index';

import { useCaseLogApi } from '@common/api';
import { CaseLog, caseLogsAtom, Detail, idAtom } from '@recoil';

jest.mock('@common/api', () => ({
  useCaseLogApi: jest.fn(),
}));
jest.mock('@utils', () => ({
  formatTimeUntilSecond: jest.fn(),

  logAxiosError: jest.fn(),
  useErrorSetter: jest.fn(() => jest.fn()),
}));

describe('CaseLogTable', () => {
  const mockSetDetails = jest.fn();
  const mockResetActualResultJson = jest.fn();
  const mockResetDetailsExpectedResultJson = jest.fn();
  const mockResetCaseLogId = jest.fn();
  const mockResetDetails = jest.fn();

  const mockCaseLog: CaseLog = {
    caseName: 'name',
    result: 'pass',
    createdAt: 'tomorrow',
    caseId: 'id1',
    expectedResultId: 'id2',
    executionLogId: 'id3',
  };
  const mockCaseLogs = [mockCaseLog];
  const mockDetail: Detail = {
    result: 'true',
    resultLog: 'log',
    actualResult: 'ar',
    expectedResult: { data: 'er' },
    checkType: 'pacs',
    id: 'detailId',
  };
  const mockDetails = [mockDetail];
  beforeEach(() => {
    jest.spyOn(recoil, 'useSetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'detailsAtom') {
        return mockSetDetails;
      }
      return jest.fn();
    });

    jest.spyOn(recoil, 'useResetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'actualResultJsonAtom') {
        return mockResetActualResultJson;
      }
      if (atom.key === 'detailsExpectedResultJsonAtom') {
        return mockResetDetailsExpectedResultJson;
      }
      if (atom.key === 'detailsAtom') {
        return mockResetDetails;
      }
      if (atom === idAtom('caseLogId')) {
        return mockResetCaseLogId;
      }
      return jest.fn();
    });

    (useCaseLogApi as jest.Mock).mockReturnValue({
      getDetailsById: jest.fn().mockResolvedValue(mockDetails),
    });
  });
  const renderComponent = (initialCaseLogId: string | null = null) =>
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(caseLogsAtom, mockCaseLogs);
          if (initialCaseLogId !== null) {
            set(idAtom('caseLogId'), initialCaseLogId);
          }
        }}
      >
        <CaseLogTable />
      </RecoilRoot>,
    );

  it('DataTable', () => {
    renderComponent();
    expect(screen.getByText('name')).toBeInTheDocument();
  });

  it('onRowClick', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('name'));

    await waitFor(() => {
      expect(useCaseLogApi()?.getDetailsById).toHaveBeenCalledWith({
        executionLogId: 'id3',
        caseId: 'id1',
        expectedResultId: 'id2',
      });
      expect(mockResetActualResultJson).toHaveBeenCalled();
      expect(mockResetDetailsExpectedResultJson).toHaveBeenCalled();
    });
  });

  it('caseLogId === params.row.caseId && event.ctrlKey', async () => {
    renderComponent('id1');

    fireEvent.click(screen.getByText('name'), { ctrlKey: true });

    await waitFor(() => {
      expect(mockResetActualResultJson).toHaveBeenCalled();
      expect(mockResetDetailsExpectedResultJson).toHaveBeenCalled();
      expect(mockResetCaseLogId).toHaveBeenCalled();
      expect(mockResetDetails).toHaveBeenCalled();
    });
  });

  it('caseLogId === params.row.caseId && !event.ctrlKey', async () => {
    renderComponent('id1');

    fireEvent.click(screen.getByText('name'), { ctrlKey: false });

    await waitFor(() => {
      expect(useCaseLogApi()?.getDetailsById).not.toHaveBeenCalled();
      expect(mockResetActualResultJson).not.toHaveBeenCalled();
      expect(mockResetDetailsExpectedResultJson).not.toHaveBeenCalled();
    });
  });
});
