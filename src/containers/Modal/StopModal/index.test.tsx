import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import * as recoil from 'recoil';

import { StopModal } from './index';

import { dichotomyAtom } from '@recoil';

jest.mock('@common/api', () => ({
  useExecutionApi: jest.fn(),
}));

describe('StopModal', () => {
  const mockSetStopModalOpen = jest.fn();
  const mockSetExecutionLogs = jest.fn();
  const mockSetLoading = jest.fn();

  beforeEach(() => {
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

  it('yes', async () => {
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

    fireEvent.click(screen.getByText('Yes'));

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalled();
      expect(mockSetStopModalOpen).toHaveBeenCalledWith(false);
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
});
