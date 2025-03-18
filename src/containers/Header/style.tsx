import { Box, styled, Button } from '@mui/material';

//TODO: 스타일 padding, height 변경
export const HeaderBox = styled(Box)(() => ({
  width: '100%',
  minWidth: '1920px',
  height: '108px',
  fontSize: '40px',
  color: 'white',
  fontWeight: 'bolder',
  paddingLeft: '70px',
  paddingRight: '70px',
  paddingTop: '20px',
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
