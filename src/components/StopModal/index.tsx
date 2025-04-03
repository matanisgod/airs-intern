import React, { useState } from 'react';

import { Modal } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { ButtonBox, StopModalBox } from './style';

import { useExecutionApi } from '@common/api';
import { NoButton, YesButton } from '@components';
import { executionLogsAtom, isStopModalOpenAtom, stopTargetAtom } from '@recoil';

export const StopModal = () => {
  const executionApi = useExecutionApi();

  const [isLoading, setIsLoading] = useState(false);
  const [isStopModalOpen, setIsStopModalOpen] = useRecoilState(isStopModalOpenAtom);

  const stopTarget = useRecoilValue(stopTargetAtom);
  const setExecutionLogs = useSetRecoilState(executionLogsAtom);
  const handleStopModalClose = () => {
    setIsStopModalOpen(false);
  };
  const fetchExecutionLogs = async () => {
    if (!executionApi) return;

    const response = await executionApi.getExecutionLogs();
    if (response) {
      setExecutionLogs(response);
    }
  };
  const fetchExecution = async () => {
    if (!executionApi) return;
    const response = await executionApi.cancelExecution();
    if (response) {
      fetchExecutionLogs();
    }
  };
  const fetchExecutionById = async (params: string) => {
    if (!executionApi) return;
    const response = await executionApi.cancelExecutionById(params);
    if (response) {
      fetchExecutionLogs();
    }
  };
  return (
    <Modal open={isStopModalOpen}>
      <StopModalBox>
        {stopTarget === ''
          ? isLoading
            ? 'Loading...'
            : 'Do you really want to stop all?'
          : isLoading
            ? 'Loading...'
            : 'Do you really want to stop?'}
        <br />
        <br />
        <ButtonBox>
          <YesButton
            onClick={async (event) => {
              event.stopPropagation();
              setIsLoading(true);
              if (stopTarget === '') await fetchExecution();
              else await fetchExecutionById(stopTarget);
              setIsLoading(false);
              handleStopModalClose();
            }}
          >
            Yes
          </YesButton>

          <NoButton
            onClick={() => {
              handleStopModalClose();
            }}
          >
            No
          </NoButton>
        </ButtonBox>
      </StopModalBox>
    </Modal>
  );
};
