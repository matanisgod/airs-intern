import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import * as recoil from 'recoil';

import { StopModal } from './index';

import { useExecutionApi } from '@common/api';
import { dichotomyAtom } from '@recoil';

jest.mock('@common/api', () => ({
  useExecutionApi: jest.fn(),
}));

describe('StopModal', () => {
  const mockSetStopModalOpen = jest.fn();
  const mockSetExecutionLogs = jest.fn();
  const mockSetLoading = jest.fn();
  const mockCancelExecution = jest.fn();
  const mockCancelExecutionById = jest.fn();
  const mockGetExecutionLogs = jest.fn();

  beforeEach(() => {
    (useExecutionApi as jest.Mock).mockReturnValue({
      cancelExecution: mockCancelExecution,
      cancelExecutionById: mockCancelExecutionById,
      getExecutionLogs: mockGetExecutionLogs,
    });

    jest.spyOn(React, 'useState').mockImplementation(() => [false, mockSetLoading]);

    jest.spyOn(recoil, 'useRecoilState').mockImplementation((atom) => {
      if (atom === dichotomyAtom('isStopModalOpen')) {
        return [true, mockSetStopModalOpen];
      }
      return [null, jest.fn()];
    });

    jest.spyOn(recoil, 'useSetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'executionLogsAtom') {
        return mockSetExecutionLogs;
      }
      return jest.fn();
    });
  });

  it('stop all', () => {
    jest.spyOn(recoil, 'useRecoilValue').mockImplementation((atom) => {
      if (atom.key === 'stopTargetAtom') {
        return 'All';
      }
      return null;
    });
    render(
      <RecoilRoot>
        <StopModal />
      </RecoilRoot>,
    );

    expect(screen.getByText('Do you really want to stop all?')).toBeInTheDocument();
  });
  it('stop', () => {
    jest.spyOn(recoil, 'useRecoilValue').mockImplementation((atom) => {
      if (atom.key === 'stopTargetAtom') {
        return '';
      }
      return null;
    });
    render(
      <RecoilRoot>
        <StopModal />
      </RecoilRoot>,
    );

    expect(screen.getByText('Do you really want to stop?')).toBeInTheDocument();
  });

  it('yes stop all', async () => {
    jest.spyOn(recoil, 'useRecoilValue').mockImplementation((atom) => {
      if (atom.key === 'stopTargetAtom') {
        return 'All';
      }
      return null;
    });
    (mockCancelExecution as jest.Mock).mockResolvedValue(true);
    (mockGetExecutionLogs as jest.Mock).mockResolvedValue(true);

    render(
      <RecoilRoot>
        <StopModal />
      </RecoilRoot>,
    );

    fireEvent.click(screen.getByText('Yes'));

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(mockCancelExecution).toHaveBeenCalled();
      expect(mockGetExecutionLogs).toHaveBeenCalled();
      expect(mockSetExecutionLogs).toHaveBeenCalled();
      expect(mockSetStopModalOpen).toHaveBeenCalledWith(false);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  it('yes stop', async () => {
    jest.spyOn(recoil, 'useRecoilValue').mockImplementation((atom) => {
      if (atom.key === 'stopTargetAtom') {
        return '';
      }
      return null;
    });
    (mockCancelExecutionById as jest.Mock).mockResolvedValue(true);
    render(
      <RecoilRoot>
        <StopModal />
      </RecoilRoot>,
    );

    fireEvent.click(screen.getByText('Yes'));

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
      expect(mockCancelExecutionById).toHaveBeenCalledWith('');
      expect(mockGetExecutionLogs).toHaveBeenCalled();
      expect(mockSetStopModalOpen).toHaveBeenCalledWith(false);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
  });

  it('no', () => {
    render(
      <RecoilRoot>
        <StopModal />
      </RecoilRoot>,
    );

    fireEvent.click(screen.getByText('No'));

    expect(mockSetStopModalOpen).toHaveBeenCalledWith(false);
  });

  it('isLoading', () => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [true, mockSetLoading]);

    render(
      <RecoilRoot>
        <StopModal />
      </RecoilRoot>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
