import { styled, Box } from '@mui/material';

export const StopModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20%',
  height: '15%',
  backgroundColor: '#222222',
  border: '1px solid white !important',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '30px',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ButtonBox = styled(Box)({
  display: 'flex',
  gap: '20px',
});
