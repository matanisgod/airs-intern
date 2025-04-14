import React, { useMemo, useState } from 'react';

import { Modal } from '@mui/material';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { ButtonBox } from './style';

import { useExecutionApi } from '@common/api';
import { DecisionButton, ModalContentBox, ModalBox } from '@components';
import { executionLogsAtom, stopTargetAtom, dichotomyAtom } from '@recoil';

export const StopModal = () => {
  const executionApi = useExecutionApi();

  const [isLoading, setIsLoading] = useState(false);
  const [isStopModalOpen, setIsStopModalOpen] = useRecoilState(
    dichotomyAtom('isStopModalOpen'),
  );

  const stopTarget = useRecoilValue(stopTargetAtom);
  const setExecutionLogs = useSetRecoilState(executionLogsAtom);
  const onClose = () => {
    setIsStopModalOpen(false);
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
    setIsLoading(true);
    if (stopTarget === 'All') {
      await updateExecution();
    } else {
      await updateExecutionById(stopTarget);
    }
    onClose();
    setIsLoading(false);
  };
  const stopModalMessage = useMemo(() => {
    if (isLoading) return 'Loading...';
    if (stopTarget === 'All') return 'Do you really want to stop all?';
    return 'Do you really want to stop?';
  }, [isLoading, stopTarget]);

  return (
    <Modal open={isStopModalOpen}>
      <ModalBox>
        <ModalContentBox>
          {stopModalMessage}
          <ButtonBox>
            <DecisionButton onClick={handleStop}>Yes</DecisionButton>
            <DecisionButton onClick={onClose}>No</DecisionButton>
          </ButtonBox>
        </ModalContentBox>
      </ModalBox>
    </Modal>
  );
};
