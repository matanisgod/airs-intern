import React from 'react';

import { Modal } from '@mui/material';
import { useRecoilState } from 'recoil';

import { ErrorModalBox } from './style';

import { isErrorModalOpenAtom, errorMessageAtom } from '@/recoil/status';

export const ErrorModal = () => {
  const [errorModalOpen, setErrorModalOpen] = useRecoilState(isErrorModalOpenAtom);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageAtom);

  const handleErrorModalClose = () => {
    setErrorMessage({ status: 0, statusText: '' });
    setErrorModalOpen(false);
  };

  return (
    <Modal open={errorModalOpen} onClose={handleErrorModalClose}>
      <ErrorModalBox>
        Error
        <br />
        {errorMessage.status} {errorMessage.statusText}
      </ErrorModalBox>
    </Modal>
  );
};
