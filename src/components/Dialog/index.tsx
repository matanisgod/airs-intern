import { styled, DialogTitle, Dialog, DialogContentText } from '@mui/material';

export const CreateDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    width: '500px',
    maxWidth: '500px',
    border: '1px solid gray',
  },
}));

export const CreateDialogContentText = styled(DialogContentText)(() => ({
  color: 'white',
}));

export const CreateDialogTitle = styled(DialogTitle)(() => ({
  border: '1px solid gray',
}));
