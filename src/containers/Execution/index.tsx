import React from 'react';

import { useRecoilState } from 'recoil';

import { CreateExecutionDialog } from './dialog';
import { ExecutionBox } from './style';
import { ExecutionPageLayout } from './util';

import { executionDialogIsOpenAtom } from '@/recoil/status';
import { CreateDialog, CreateDialogTitle } from '@components';

const Execution = () => {
  const [open, setOpen] = useRecoilState(executionDialogIsOpenAtom);

  //TODO: reset 왜 안 되는지?
  const handleClose = () => {
    setOpen(false);
  };

  //TODO: open을 다른 파일로
  //54번째 줄부터 다른 파일로 옮겨서

  return (
    <React.Fragment>
      <ExecutionBox>
        <CreateDialog
          open={open}
          onClose={(_, reason) => {
            if (reason === 'backdropClick') return;
            handleClose();
          }}
          disableRestoreFocus
        >
          <CreateDialogTitle>Create execution</CreateDialogTitle>
          <CreateExecutionDialog />
        </CreateDialog>
        <ExecutionPageLayout />
      </ExecutionBox>
    </React.Fragment>
  );
};

export default Execution;
