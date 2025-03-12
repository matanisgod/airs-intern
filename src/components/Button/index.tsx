import { Button, styled } from '@mui/material';

export const CreateButton = styled(Button)(() => ({
  width: '200px',
  height: '50px',
  color: 'black',
  backgroundColor: '#f2f2f2',
  textTransform: 'none',
  fontSize: '20px',
  '&:hover': {
    background: '#888888',
  },
  marginLeft: 'auto',
  marginRight: '10px',
}));
export const StopAllButton = styled(Button)(() => ({
  width: '100%',
  height: '100%',
  color: 'black',
  backgroundColor: '#f2f2f2 ',
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
  backgroundColor: '#f2f2f2 ',
  textTransform: 'none',
  fontSize: '14px',
  '&:hover': {
    background: '#888888',
  },
}));

export const CancelSubmitButton = styled(Button)(() => ({
  color: 'black',
  backgroundColor: '#f2f2f2',
  textTransform: 'none',
  '&:hover': {
    background: '#888888',
  },
}));
