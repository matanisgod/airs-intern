import { Box, styled, Button } from '@mui/material';

export const HeaderBox = styled(Box)(() => ({
  fontSize: '40px',
  color: 'white',
  fontWeight: 'bolder',
  left: '40px',
  top: '25px',
  position: 'fixed',
}));

export const PageButton = styled(Button)(() => ({
  fontSize: '24px',
  color: 'black',
  fontWeight: 'normal',
  right: '30px',
  top: '25px',
  position: 'fixed',
  background: 'white',
  textTransform: 'none',
  '&:hover': {
    background: 'gray',
  },
}));
