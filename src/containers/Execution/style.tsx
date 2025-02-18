import {
  styled,
  Box,
  Button,
  DialogTitle,
  ListItemText,
  MenuItem,
  Dialog,
} from '@mui/material';

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

export const CreateExecutionButton = styled(Button)(() => ({
  marginLeft: '30px',
  width: '200px',
  height: '50px',
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

export const CreateExecutionDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    width: '500px',
    maxWidth: '500px',
  },
}));
