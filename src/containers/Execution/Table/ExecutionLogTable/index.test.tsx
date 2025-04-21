import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import * as recoil from 'recoil';

import { ExecutionLogTable } from './index';

import { useCaseLogApi, useCaseSetApi, useExecutionApi } from '@common/api';
import { CaseLog, CaseSet, ExecutionLog, executionLogsAtom, idAtom } from '@recoil';

jest.mock('@common/api', () => ({
  useCaseLogApi: jest.fn(),
  useCaseSetApi: jest.fn(),
  useExecutionApi: jest.fn(),
}));
jest.mock('@utils', () => ({
  formatTimeUntilSecond: jest.fn(),
  logAxiosError: jest.fn(),
  useErrorSetter: jest.fn(() => jest.fn()),
}));

describe('ExecutionLogTable', () => {
  const mockSetCaseSets = jest.fn();
  const mockSetCaseLogs = jest.fn();
  const mockResetExecutionLogId = jest.fn();
  const mockResetCaseLogId = jest.fn();
  const mockResetCaseLogs = jest.fn();
  const mockResetDetails = jest.fn();
  const mockResetActualResultJson = jest.fn();
  const mockResetDetailsExpectedResultJson = jest.fn();

  const mockExecutionLog: ExecutionLog = {
    performer: 'junha',
    createdAt: 'today',
    status: 'running',
    id: 'dididi',
  };
  const mockExecutionLogs = [mockExecutionLog];

  const mockCaseLog: CaseLog = {
    caseName: 'name',
    result: 'pass',
    createdAt: 'tomorrow',
    caseId: 'id1',
    expectedResultId: 'id2',
    executionLogId: 'id3',
  };
  const mockCaseLogs = [mockCaseLog];

  const mockCaseSet: CaseSet = {
    type: 'type',
    title: 'title',
    id: 'idid',
    cases: [],
  };
  const mockCaseSets = [mockCaseSet];

  beforeEach(() => {
    jest.spyOn(recoil, 'useSetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'caseSetsAtom') {
        return mockSetCaseSets;
      }
      if (atom.key === 'caseLogsAtom') {
        return mockSetCaseLogs;
      }
      return jest.fn();
    });

    jest.spyOn(recoil, 'useResetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'caseLogsAtom') {
        return mockResetCaseLogs;
      }
      if (atom.key === 'detailsAtom') {
        return mockResetDetails;
      }
      if (atom.key === 'actualResultJsonAtom') {
        return mockResetActualResultJson;
      }
      if (atom.key === 'detailsExpectedResultJsonAtom') {
        return mockResetDetailsExpectedResultJson;
      }

      if (atom === idAtom('executionLogId')) {
        return mockResetExecutionLogId;
      }
      if (atom === idAtom('caseLogId')) {
        return mockResetCaseLogId;
      }
      return jest.fn();
    });

    (useExecutionApi as jest.Mock).mockReturnValue({
      getExecutionLogs: jest.fn().mockResolvedValue(mockExecutionLogs),
    });

    (useCaseLogApi as jest.Mock).mockReturnValue({
      getGroupedCaseLogsById: jest.fn().mockResolvedValue(mockCaseLogs),
    });

    (useCaseSetApi as jest.Mock).mockReturnValue({
      getCaseSets: jest.fn().mockResolvedValue(mockCaseSets),
    });
  });

  const renderComponent = (initialExecutionLogId: string | null = null) =>
    render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(executionLogsAtom, mockExecutionLogs);
          if (initialExecutionLogId) {
            set(idAtom('executionLogId'), initialExecutionLogId);
          }
        }}
      >
        <ExecutionLogTable />
      </RecoilRoot>,
    );

  it('DataTable', () => {
    renderComponent();
    expect(screen.getByText('junha')).toBeInTheDocument();
  });

  it('onRowClick', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('junha'));

    await waitFor(() => {
      expect(useCaseLogApi()?.getGroupedCaseLogsById).toHaveBeenCalledWith({
        executionId: 'dididi',
      });
      expect(mockSetCaseLogs).toHaveBeenCalledWith(mockCaseLogs);
      expect(mockResetDetails).toHaveBeenCalled();
      expect(mockResetActualResultJson).toHaveBeenCalled();
      expect(mockResetDetailsExpectedResultJson).toHaveBeenCalled();
      expect(mockResetCaseLogId).toHaveBeenCalled();
    });
  });

  it('executionLogId === params.row.id && event.ctrlKey', async () => {
    renderComponent('dididi');

    fireEvent.click(screen.getByText('junha'), { ctrlKey: true });

    await waitFor(() => {
      expect(mockResetDetails).toHaveBeenCalled();
      expect(mockResetActualResultJson).toHaveBeenCalled();
      expect(mockResetDetailsExpectedResultJson).toHaveBeenCalled();
      expect(mockResetCaseLogId).toHaveBeenCalled();
      expect(mockResetExecutionLogId).toHaveBeenCalled();
      expect(mockResetCaseLogs).toHaveBeenCalled();
    });
  });

  it('executionLogId === params.row.id && !event.ctrlKey', async () => {
    renderComponent('dididi');

    fireEvent.click(screen.getByText('junha'), { ctrlKey: false });

    await waitFor(() => {
      expect(useCaseLogApi()?.getGroupedCaseLogsById).not.toHaveBeenCalled();
      expect(mockSetCaseLogs).not.toHaveBeenCalledWith(mockCaseLogs);
      expect(mockResetDetails).not.toHaveBeenCalled();
      expect(mockResetActualResultJson).not.toHaveBeenCalled();
      expect(mockResetDetailsExpectedResultJson).not.toHaveBeenCalled();
      expect(mockResetCaseLogId).not.toHaveBeenCalled();
    });
  });
});
