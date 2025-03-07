import React from 'react';

import { Modal } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';

import { ErrorModalBox } from './style';

import { isErrorModalOpenAtom, errorMessageAtom } from '@/recoil/status';
import { ModalDataBox, ModalHeaderBox } from '@components';

const errorDataViewer = (e) => {
  if (typeof e === 'string') return e;
  if (Array.isArray(e)) {
    return e.map((e) => `type: ${e.type}\nloc: ${e.loc[1]}\nmsg: ${e.msg}\n`).join('\n');
  }
};
export const ErrorModal = () => {
  const errorMessage = useRecoilValue(errorMessageAtom);
  const [errorModalOpen, setErrorModalOpen] = useRecoilState(isErrorModalOpenAtom);
  const handleErrorModalClose = () => setErrorModalOpen(false);

  return (
    <Modal open={errorModalOpen} onClose={handleErrorModalClose}>
      <ErrorModalBox>
        <ModalHeaderBox>
          Error: {errorMessage.errorStatus} {errorMessage.errorStatusText}
        </ModalHeaderBox>
        <ModalDataBox>{errorDataViewer(errorMessage.errorData.detail)}</ModalDataBox>
      </ErrorModalBox>
    </Modal>
  );
};
