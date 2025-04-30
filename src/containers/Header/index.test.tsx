import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import * as recoil from 'recoil';

import { Header } from './index';

import { dichotomyAtom } from '@recoil';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('@containers', () => ({
  ErrorModal: () => <div>ErrorModal</div>,
  StopModal: () => <div>StopModal</div>,
}));

describe('Header', () => {
  const mockNavigate = jest.fn();
  const mockResetCases = jest.fn();
  const mockResetCaseSets = jest.fn();
  const mockResetExpectedResults = jest.fn();
  const mockResetCaseJson = jest.fn();
  const mockResetCaseExpectedResultJson = jest.fn();
  const mockResetExecutionLogs = jest.fn();
  const mockResetCaseLogs = jest.fn();
  const mockResetDetails = jest.fn();
  const mockResetActualResultJson = jest.fn();
  const mockResetDetailsExpectedResultJson = jest.fn();
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    jest.spyOn(recoil, 'useRecoilValue').mockImplementation((atom) => {
      if (atom === dichotomyAtom('isErrorModalOpen')) {
        return true;
      }
      if (atom === dichotomyAtom('isStopModalOpen')) {
        return true;
      }
      return null;
    });

    jest.spyOn(recoil, 'useResetRecoilState').mockImplementation((atom) => {
      if (atom.key === 'casesAtom') {
        return mockResetCases;
      }
      if (atom.key === 'caseSetsAtom') {
        return mockResetCaseSets;
      }
      if (atom.key === 'expectedResultsAtom') {
        return mockResetExpectedResults;
      }
      if (atom.key === 'caseJsonAtom') {
        return mockResetCaseJson;
      }
      if (atom.key === 'caseExpectedResultJsonAtom') {
        return mockResetCaseExpectedResultJson;
      }
      if (atom.key === 'executionLogsAtom') {
        return mockResetExecutionLogs;
      }
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
      return jest.fn();
    });
  });

  it('/execution', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/execution' });

    render(
      <RecoilRoot>
        <Header />
      </RecoilRoot>,
    );

    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(mockResetExecutionLogs).toHaveBeenCalled();
    expect(mockResetCaseLogs).toHaveBeenCalled();
    expect(mockResetDetails).toHaveBeenCalled();
    expect(mockResetActualResultJson).toHaveBeenCalled();
    expect(mockResetDetailsExpectedResultJson).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/caseset');
  });

  it('/caseset', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/caseset' });

    render(
      <RecoilRoot>
        <Header />
      </RecoilRoot>,
    );

    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(mockResetCases).toHaveBeenCalled();
    expect(mockResetCaseSets).toHaveBeenCalled();
    expect(mockResetExpectedResults).toHaveBeenCalled();
    expect(mockResetCaseJson).toHaveBeenCalled();
    expect(mockResetCaseExpectedResultJson).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/execution');
  });

  it('ErrorModal', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/execution' });

    render(
      <RecoilRoot>
        <Header />
      </RecoilRoot>,
    );

    expect(screen.getByText('ErrorModal')).toBeInTheDocument();
  });

  it('StopModal', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/execution' });

    render(
      <RecoilRoot>
        <Header />
      </RecoilRoot>,
    );

    expect(screen.getByText('StopModal')).toBeInTheDocument();
  });
});
