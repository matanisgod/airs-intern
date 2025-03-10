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
  marginRight: '10px',
}));
export const StopAllButton = styled(Button)(() => ({
  width: '100%',
  height: '100%',
  color: 'black',
  backgroundColor: '#ffffff ',
  textTransform: 'none',
  fontSize: '20px',
  '&:hover': {
    background: '#888888',
  },
}));
export const StopButton = styled(Button)(() => ({
  width: '100%',
  height: '100%',
  color: 'black',
  backgroundColor: '#ffffff ',
  textTransform: 'none',
  fontSize: '14px',
  '&:hover': {
    background: '#888888',
  },
}));

export const CancelSubmitButton = styled(Button)(() => ({
  color: 'black',
  backgroundColor: 'white',
  textTransform: 'none',
  '&:hover': {
    background: 'gray',
  },
}));
