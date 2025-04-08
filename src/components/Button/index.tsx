import React from 'react';

import RefreshIcon from '@mui/icons-material/Refresh';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Button, styled } from '@mui/material';

export const CreateButton = styled(Button)(() => ({
  color: 'black',
  background: '#f2f2f2',
  textTransform: 'none',
  '&:hover': {
    background: '#888888',
  },
}));

export const DecisionButton = styled(Button)(() => ({
  color: 'black',
  background: '#f2f2f2',
  textTransform: 'none',
  '&:hover': {
    background: '#888888',
  },
}));

export const ConfirmButton = styled(Button)(() => ({
  color: 'black',
  background: '#f2f2f2',
  textTransform: 'none',
  '&:hover': {
    background: '#888888',
  },
}));
export const CancelButton = () => {
  return (
    <StopCircleIcon
      sx={{
        fontSize: '50px',
        color: 'white',
        padding: '0px',
        background: '#232A3E',
        '&:hover': {
          background: '#232A3E',
        },
      }}
    />
  );
};
export const RefreshButton = () => {
  return (
    <RefreshIcon
      sx={{
        fontSize: '50px',
        color: 'white',
        padding: '0px',
        background: '#232A3E',
        '&:hover': {
          background: '#232A3E',
        },
      }}
    />
  );
};
