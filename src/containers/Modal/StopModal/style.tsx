import { styled, Box } from '@mui/material';

import { ConfirmButton, ModalBox } from '@components';

export const StopModalBox = styled(ModalBox)({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  minwidth: '576px',
  height: '20%',
  minHeight: '216px',

  fontSize: '30px',
});

export const ButtonBox = styled(Box)({
  display: 'flex',
  gap: '20px',
});

export const ErrorConfirmButton = styled(ConfirmButton)(() => ({
  width: '65px',
  height: '40px',
}));
