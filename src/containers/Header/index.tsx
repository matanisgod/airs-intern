import React from 'react';

import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { HeaderBox, PageButton } from './style';

import { ErrorModal, StopModal } from '@containers';
import {
  dichotomyAtom,
  casesAtom,
  caseSetsAtom,
  expectedResultsAtom,
  caseJsonAtom,
  caseExpectedResultJsonAtom,
  executionLogsAtom,
  caseLogsAtom,
  detailsAtom,
  actualResultJsonAtom,
  detailsExpectedResultJsonAtom,
} from '@recoil';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isErrorModalOpen = useRecoilValue(dichotomyAtom('isErrorModalOpen'));
  const isStopModalOpen = useRecoilValue(dichotomyAtom('isStopModalOpen'));

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
  const resetIsExecutionLogRowClicked = useResetRecoilState(
    dichotomyAtom('isExecutionLogRowClicked'),
  );

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
        {location.pathname === '/execution' && (
          <PageButton
            onClick={() => {
              cleanExecutionPage();
              navigate('/caseset');
            }}
          >
            Move to caseset
          </PageButton>
        )}
        {location.pathname === '/caseset' && (
          <PageButton
            onClick={() => {
              cleanCaseSetPage();
              navigate('/execution');
            }}
          >
            Move to execution
          </PageButton>
        )}
      </HeaderBox>
      <Outlet />
      {/* Modals */}
      {isErrorModalOpen && <ErrorModal />}
      {isStopModalOpen && <StopModal />}
    </React.Fragment>
  );
};
