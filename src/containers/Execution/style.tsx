import { styled, Box, Button, ListItemText, MenuItem } from '@mui/material';

export const ExecutionBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  '& svg': {
    width: '350px',
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

export const TestSetsMenu = styled(MenuItem)(() => ({}));

export const TestSetsText = styled(ListItemText)(() => ({}));

export const ExecutionLogTableBox = styled(Box)(() => ({
  width: '35%',
  height: '95%',
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
  border: '1px solid white',
}));

export const CaseLogTableBox = styled(Box)(() => ({
  width: '95%',
  height: '48%',
  display: 'flex',
  alignSelf: 'flex-end',
  flexDirection: 'column',
  border: '1px solid white',
}));

export const DetailsTableBox = styled(Box)(() => ({
  width: '95%',
  height: '48%',
  display: 'flex',
  alignSelf: 'flex-end',
  marginTop: 'auto',
  flexDirection: 'column',
  border: '1px solid white',
}));
