import {
  styled,
  DialogTitle,
  Dialog,
  DialogContentText,
  FormControl,
  DialogContent,
  Checkbox,
  MenuItem,
} from '@mui/material';

export const CreateDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    width: '500px',
    maxWidth: '500px',
    border: '1px solid white',
    background: '#222222',
  },
}));
export const CreateDialogContentText = styled(DialogContentText)(() => ({
  color: 'white',
}));

export const CreateDialogTitle = styled(DialogTitle)(() => ({
  borderBottom: '1px solid white',
}));

const ITEM_HEIGHT = 48;

export const MenuProps = {
  PaperProps: {
    sx: {
      backgroundColor: '#222222',
      color: 'white',
      border: '1px solid white',
      maxHeight: ITEM_HEIGHT * 10,
      width: 250,
      '&::-webkit-scrollbar': {
        width: '8px',
        border: 'none',
      },

      '&::-webkit-scrollbar-thumb': {
        background: '#ffffff',
        border: 'none',
        borderRadius: '5px',
      },
    },
  },
  MenuListProps: {
    sx: {
      padding: '0px !important',
      margin: '0px !important',
      '& .MuiMenuItem-root': {
        color: 'white !important',
        border: '1px solid white',
      },
    },
  },
};

export const CreateDialogFormControl = styled(FormControl)(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: 'white',
  },
}));

export const CreateDialogContent = styled(DialogContent)(() => ({
  '& .MuiMenuItem-root': {
    color: 'white',
  },
}));

export const CreateDialogCheckbox = styled(Checkbox)(() => ({
  color: 'white',
  '&.Mui-checked': {
    color: 'white',
  },
}));

export const CreateDialogMenuItem = styled(MenuItem)(() => ({
  '&.Mui-selected': {
    background: '#666666',
  },
  '&.Mui-selected:hover': {
    background: '#777777',
  },
}));
