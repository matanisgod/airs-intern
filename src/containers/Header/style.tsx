import React from 'react';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Box, styled, Button } from '@mui/material';

export const HeaderBox = styled(Box)(() => ({
  width: '100%',
  minWidth: '1600px',
  height: '108px',
  fontSize: '40px',
  color: 'white',
  fontWeight: 'bolder',
  paddingLeft: '70px',
  paddingRight: '70px',
  paddingTop: '20px',
  paddingBottom: '20px',
  alignItems: 'center',
  display: 'flex',
}));

export const PageButton = styled(Button)(() => ({
  color: '#D9D9D9',
  background: '#121212',
  '&:hover': {
    background: '#121212',
  },
  marginLeft: 'auto',
  width: '50px',
  height: '50px',
  padding: '0px',
}));

export const FirstPageButton = () => {
  return (
    <FirstPageIcon
      sx={{
        fontSize: '50px',
        color: '#D9D9D9',
        background: '#121212',
        '&:hover': {
          background: '#121212',
        },
      }}
    />
  );
};

export const LastPageButton = () => {
  return (
    <LastPageIcon
      sx={{
        fontSize: '50px',
        color: '#D9D9D9',
        background: '#121212',
        '&:hover': {
          background: '#121212',
        },
      }}
    />
  );
};
