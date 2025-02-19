import {
  styled,
  Box,
  Button,
  DialogTitle,
  ListItemText,
  MenuItem,
  Dialog,
  DialogContentText,
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

export const CreateExecutionDialogTitle = styled(DialogTitle)(() => ({}));

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

export const CreateExecutionDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    width: '500px',
    maxWidth: '500px',
  },
}));

export const CreateExecutionDialogContentText = styled(DialogContentText)(() => ({
  color: 'white',
}));

export const ExecutionsTableBox = styled(Box)(() => ({
  width: '30%',
  height: '95%',
  display: 'flex',
  background: 'red',
  alignSelf: 'center',
  flexDirection: 'column',
}));

export const CaseLogTableBox = styled(Box)(() => ({
  width: '95%',
  height: '48%',
  display: 'flex',
  alignSelf: 'flex-end',
  flexDirection: 'column',
}));

export const DetailsTableBox = styled(Box)(() => ({
  width: '95%',
  height: '48%',
  display: 'flex',
  alignSelf: 'flex-end',
  marginTop: 'auto',
  flexDirection: 'column',
}));
