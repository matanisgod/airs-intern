import React from 'react';

import { Modal } from '@mui/material';
import { useRecoilState } from 'recoil';

import { ErrorModalBox } from './style';

import { isErrorModalOpenAtom, errorMessageAtom } from '@/recoil/status';

export const ErrorModal = () => {
  const [isErrorModalOpen, setErrorModalOpen] = useRecoilState(isErrorModalOpenAtom);
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageAtom);

  const handleErrorModalClose = () => {
    setErrorMessage({ status: undefined, statusText: '' });
    setErrorModalOpen(false);
  };

  return (
    <Modal open={isErrorModalOpen} onClose={handleErrorModalClose}>
      <ErrorModalBox>
        Error
        <br />
        {errorMessage.status === undefined
          ? 'Timeout'
          : `${errorMessage.status} ${errorMessage.statusText}`}
      </ErrorModalBox>
    </Modal>
  );
};
