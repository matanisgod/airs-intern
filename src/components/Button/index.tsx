import React from 'react';

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
  color: 'white',
  backgroundColor: '#6d7785',
  textTransform: 'none',
  fontSize: '20px',
  '&:hover': {
    background: '#888888',
  },
}));
export const StopButton = styled(Button)(() => ({
  width: '100%',
  height: '100%',
  color: 'white',
  backgroundColor: '#444444',
  textTransform: 'none',
  fontSize: '14px',
  '&:hover': {
    background: '#888888',
  },
}));

export const CancelButton = styled(Button)(() => ({
  color: 'black',
  backgroundColor: '#f2f2f2',
  textTransform: 'none',
  '&:hover': {
    background: '#888888',
  },
}));

export const SubmitButton = CancelButton;

export const SelectButton = styled(Button)<{ component?: React.ElementType }>(() => ({
  width: '100%',
  height: '100%',
  color: 'white',
  backgroundColor: '#444444',
  textTransform: 'none',
  fontSize: '14px',
  '&:hover': {
    background: '#888888',
  },
}));
