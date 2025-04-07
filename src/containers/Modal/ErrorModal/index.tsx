import React from 'react';

import { Modal } from '@mui/material';
import { useRecoilState } from 'recoil';

import { ErrorModalBox, ErrorConfirmButton } from './style';

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
      <ErrorModalBox>
        {errorMessage.status === undefined
          ? 'Unknown error'
          : `${errorMessage.status} ${errorMessage.statusText}`}
        <ErrorConfirmButton
          onClick={() => {
            handleErrorModalClose();
          }}
        >
          Close
        </ErrorConfirmButton>
      </ErrorModalBox>
    </Modal>
  );
};
