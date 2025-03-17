import { Box, styled, Button } from '@mui/material';

export const HeaderBox = styled(Box)(() => ({
  width: '100%',
  minWidth: '1920px',
  height: '108px',
  fontSize: '40px',
  color: 'white',
  fontWeight: 'bolder',
  padding: '80px',
  alignItems: 'center',
  display: 'flex',
}));

export const PageButton = styled(Button)(() => ({
  fontSize: '24px',
  color: 'black',
  fontWeight: 'normal',
  background: '#f2f2f2',
  textTransform: 'none',
  '&:hover': {
    background: '#888888',
  },
  marginLeft: 'auto',
  width: '250px',
  height: '50px',
}));
