import React from 'react';

import { Modal } from '@mui/material';
import { useRecoilState } from 'recoil';

import { ErrorDecisionButton } from './style';

import { ModalContentBox, ModalBox } from '@components';
import { dichotomyAtom, errorMessageAtom } from '@recoil';

export const ErrorModal = () => {
  const [isErrorModalOpen, setErrorModalOpen] = useRecoilState(
    dichotomyAtom('isErrorModalOpen'),
  );
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageAtom);

  const handleErrorModalClose = () => {
    setErrorMessage({ status: undefined, statusText: '' });
    setErrorModalOpen(false);
  };

  return (
    <Modal open={isErrorModalOpen}>
      <ModalBox>
        <ModalContentBox>
          {errorMessage.status === undefined
            ? 'Unknown error'
            : `${errorMessage.status} ${errorMessage.statusText}`}
          <ErrorDecisionButton
            onClick={() => {
              handleErrorModalClose();
            }}
          >
            Close
          </ErrorDecisionButton>
        </ModalContentBox>
      </ModalBox>
    </Modal>
  );
};
