import React from 'react';

import CreateIcon from '@mui/icons-material/Create';
import RefreshIcon from '@mui/icons-material/Refresh';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Button, styled } from '@mui/material';

export const DecisionButton = styled(Button)(() => ({
  color: '#F2F2F2',
  background: '#202027',
  textTransform: 'none',
  '&:hover': {
    background: '#424249',
  },
}));

export const CancelButton = () => {
  return (
    <StopCircleIcon
      sx={{
        fontSize: '50px',
        color: 'white',
        padding: '0px',
        background: '#121212',
        '&:hover': {
          background: '#121212',
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
        background: '#121212',
        '&:hover': {
          background: '#121212',
        },
      }}
    />
  );
};

export const CreateButton = () => {
  return (
    <CreateIcon
      sx={{
        fontSize: '50px',
        color: 'white',
        padding: '0px',
        background: '#121212',
        '&:hover': {
          background: '#121212',
        },
      }}
    />
  );
};
