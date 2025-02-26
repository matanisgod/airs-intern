import { Button, styled } from '@mui/material';

export const CreateButton = styled(Button)(() => ({
  width: '200px',
  height: '50px',
  color: 'black',
  backgroundColor: 'white',
  textTransform: 'none',
  fontSize: '20px',
  '&:hover': {
    background: 'gray',
  },
  marginLeft: 'auto',
}));
export const StopAllButton = styled(Button)(() => ({
  width: '80%',
  height: '80%',
  color: 'black',
  backgroundColor: 'white',
  textTransform: 'none',
  fontSize: '20px',
  '&:hover': {
    background: 'gray',
  },
}));
export const StopButton = styled(Button)(() => ({
  width: '80%',
  height: '80%',
  color: 'black',
  backgroundColor: 'white',
  textTransform: 'none',
  fontSize: '14px',
  '&:hover': {
    background: 'gray',
  },
}));
