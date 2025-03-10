import { styled, DialogTitle, Dialog, DialogContentText } from '@mui/material';

export const CreateDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    width: '500px',
    maxWidth: '500px',
    border: '1px solid gray',
    backgroundColor: '#121212',
  },
}));
export const CreateDialogContentText = styled(DialogContentText)(() => ({
  color: 'white',
}));

export const CreateDialogTitle = styled(DialogTitle)(() => ({
  borderBottom: '1px solid gray',
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
