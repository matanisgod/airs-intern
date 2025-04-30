import React, { useMemo, useState } from 'react';

import { Modal } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { ButtonBox, StopDecisionButton } from './style';

import { useExecutionApi } from '@common/api';
import { ModalContentBox, ModalBox } from '@components';
import { executionLogsAtom, stopTargetAtom, dichotomyAtom } from '@recoil';

export const StopModal = () => {
  const executionApi = useExecutionApi();

  const [isLoading, setLoading] = useState(false);
  const [isStopModalOpen, setStopModalOpen] = useRecoilState(
    dichotomyAtom('isStopModalOpen'),
  );

  const stopTarget = useRecoilValue(stopTargetAtom);

  const setExecutionLogs = useSetRecoilState(executionLogsAtom);
  const onClose = () => {
    setStopModalOpen(false);
  };
  const fetchExecutionLogs = async () => {
    if (!executionApi) return;

    const response = await executionApi.getExecutionLogs();
    if (response) {
      setExecutionLogs(response);
    }
  };
  const updateExecution = async () => {
    if (!executionApi) return;
    const response = await executionApi.cancelExecution();
    if (response) {
      fetchExecutionLogs();
    }
  };
  const updateExecutionById = async (params: string) => {
    if (!executionApi) return;
    const response = await executionApi.cancelExecutionById(params);
    if (response) {
      fetchExecutionLogs();
    }
  };
  const handleStop = async () => {
    setLoading(true);
    if (stopTarget === 'All') {
      await updateExecution();
    } else {
      await updateExecutionById(stopTarget);
    }
    onClose();
    setLoading(false);
  };
  const stopModalMessage = useMemo(() => {
    if (isLoading) {
      return 'Loading...';
    }
    if (stopTarget === 'All') {
      return 'Do you really want to stop all?';
    }
    return 'Do you really want to stop?';
  }, [isLoading, stopTarget]);

  return (
    <Modal open={isStopModalOpen}>
      <ModalBox>
        <ModalContentBox>
          {stopModalMessage}
          <ButtonBox>
            <StopDecisionButton onClick={handleStop}>Yes</StopDecisionButton>
            <StopDecisionButton onClick={onClose}>No</StopDecisionButton>
          </ButtonBox>
        </ModalContentBox>
      </ModalBox>
    </Modal>
  );
};
