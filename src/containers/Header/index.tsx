import React from 'react';

import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { HeaderBox, PageButton } from './style';

import { ErrorModal } from '@components';
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
} from '@recoil/status';

export const Header = () => {
  const nextPage = useNavigate();
  const currentPage = useLocation();

  const isErrorModalOpen = useRecoilValue(isErrorModalOpenAtom);

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

  const caseSetPageCleaner = () => {
    resetCases();
    resetCaseSets();
    resetExpectedResults();
    resetCaseJson();
    resetCaseExpectedResultJson();
  };

  const executionPageCleaner = () => {
    resetExecutionLogs();
    resetCaseLogs();
    resetDetails();
    resetActualResultJson();
    resetDetailsExpectedResultJson();
  };

  return (
    <React.Fragment>
      <HeaderBox>
        PQ Automation Test
        {currentPage.pathname === '/execution' && (
          <PageButton
            onClick={() => {
              executionPageCleaner();
              nextPage('/caseset');
            }}
          >
            Move to caseset
          </PageButton>
        )}
        {currentPage.pathname === '/caseset' && (
          <PageButton
            onClick={() => {
              caseSetPageCleaner();
              nextPage('/execution');
            }}
          >
            Move to execution
          </PageButton>
        )}
      </HeaderBox>
      <Outlet />
      {isErrorModalOpen && <ErrorModal />}
    </React.Fragment>
  );
};
