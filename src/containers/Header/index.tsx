import React from 'react';

import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { HeaderBox, PageButton } from './style';

import { ErrorModal, StopModal } from '@components';
import {
  actualResultJsonAtom,
  caseExpectedResultJsonAtom,
  caseJsonAtom,
  caseLogsAtom,
  casesAtom,
  caseSetsAtom,
  detailsAtom,
  detailsExpectedResultJsonAtom,
  executionLogsAtom,
  expectedResultsAtom,
  isErrorModalOpenAtom,
  isExecutionLogRowClickedAtom,
  isStopModalOpenAtom,
} from '@recoil/status';

export const Header = () => {
  const nextPage = useNavigate();
  const currentPage = useLocation();

  const isErrorModalOpen = useRecoilValue(isErrorModalOpenAtom);
  const isStopModalOpen = useRecoilValue(isStopModalOpenAtom);

  const resetCases = useResetRecoilState(casesAtom);
  const resetCaseSets = useResetRecoilState(caseSetsAtom);
  const resetExpectedResults = useResetRecoilState(expectedResultsAtom);
  const resetCaseJson = useResetRecoilState(caseJsonAtom);
  const resetCaseExpectedResultJson = useResetRecoilState(caseExpectedResultJsonAtom);
  const resetExecutionLogs = useResetRecoilState(executionLogsAtom);
  const resetCaseLogs = useResetRecoilState(caseLogsAtom);
  const resetDetails = useResetRecoilState(detailsAtom);
  const resetActualResultJson = useResetRecoilState(actualResultJsonAtom);
  const resetDetailsExpectedResultJson = useResetRecoilState(
    detailsExpectedResultJsonAtom,
  );
  const resetIsExecutionLogRowClicked = useResetRecoilState(isExecutionLogRowClickedAtom);

  const cleanExecutionPage = () => {
    resetExecutionLogs();
    resetCaseLogs();
    resetDetails();
    resetActualResultJson();
    resetDetailsExpectedResultJson();
    resetIsExecutionLogRowClicked();
  };

  const cleanCaseSetPage = () => {
    resetCases();
    resetCaseSets();
    resetExpectedResults();
    resetCaseJson();
    resetCaseExpectedResultJson();
  };

  return (
    <React.Fragment>
      <HeaderBox>
        PQ Automation Test
        {currentPage.pathname === '/execution' && (
          <PageButton
            onClick={() => {
              cleanExecutionPage();
              nextPage('/caseset');
            }}
          >
            Move to caseset
          </PageButton>
        )}
        {currentPage.pathname === '/caseset' && (
          <PageButton
            onClick={() => {
              cleanCaseSetPage();
              nextPage('/execution');
            }}
          >
            Move to execution
          </PageButton>
        )}
      </HeaderBox>
      <Outlet />
      {isErrorModalOpen && <ErrorModal />}
      {isStopModalOpen && <StopModal />}
    </React.Fragment>
  );
};
