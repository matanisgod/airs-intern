import { styled, Box } from '@mui/material';

export const ExecutionLogTableBox = styled(Box)(() => ({
  width: '35%',
  height: '95%',
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
  border: '1px solid white',
}));

export const ErrorModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '30%',
  backgroundColor: 'white',
  border: '3px solid red !important',
  color: 'black',
  display: 'flex',
  flexDirection: 'column',
});
