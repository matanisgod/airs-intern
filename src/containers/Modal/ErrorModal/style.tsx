import { styled, Box } from '@mui/material';

import { ConfirmButton } from '@components';

export const ErrorModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  minwidth: '576px',
  height: '20%',
  minHeight: '216px',
  backgroundColor: '#222222',
  border: '1px solid white !important',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '30px',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ErrorConfirmButton = styled(ConfirmButton)(() => ({
  width: '65px',
  height: '40px',
}));
