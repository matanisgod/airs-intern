import { styled, Box } from '@mui/material';

export const ErrorModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '60%',
  backgroundColor: '#121212',
  border: '1px solid white !important',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
});
