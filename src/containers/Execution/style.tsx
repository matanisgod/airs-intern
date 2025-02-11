import { styled, Box, Button } from '@mui/material';

export const ExecutionBox = styled(Box)(() => ({
  width: '50%',
  height: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  '& svg': {
    width: '350px',
  },
}));

export const CreateExecutionButton = styled(Button)(() => ({
  marginLeft: '30px',
  width: '200px',
  height: '50px',
  marginTop: '10px',
  marginBottom: '10px',
  color: 'white',
  backgroundColor: 'gray',
  position: 'fixed',
}));
