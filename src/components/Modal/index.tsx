import React from 'react';

import { Modal } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';

import { ErrorModalBox } from './style';

import { isErrorModalOpenAtom, errorMessageAtom } from '@/recoil/status';

export const ErrorModal = () => {
  const errorMessage = useRecoilValue(errorMessageAtom);
  const [errorModalOpen, setErrorModalOpen] = useRecoilState(isErrorModalOpenAtom);
  const handleErrorModalClose = () => setErrorModalOpen(false);

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
