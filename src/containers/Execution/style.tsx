import { styled, Box, Button, DialogTitle, ListItemText, MenuItem } from '@mui/material';

export const ExecutionBox = styled(Box)(() => ({
  width: '50%',
  height: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  '& svg': {
    width: '350px',
  },
}));

export const CreateExecutionButton = styled(Button)(() => ({
  marginLeft: '30px',
  width: '200px',
  height: '50px',
  marginTop: '10px',
  marginBottom: '10px',
  color: 'white',
  backgroundColor: 'gray',
  position: 'fixed',
  textTransform: 'none',
}));

export const CreateExecutionDialogTitle = styled(DialogTitle)(() => ({}));

export const CancelSubmitButton = styled(Button)(() => ({
  color: 'white',
  backgroundColor: 'gray',
  textTransform: 'none',
}));

export const TestSetsMenu = styled(MenuItem)(() => ({}));

export const TestSetsText = styled(ListItemText)(() => ({}));
