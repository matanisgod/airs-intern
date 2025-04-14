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
    background: '#202027',
  },
}));
export const CreateDialogContentText = styled(DialogContentText)(() => ({
  color: '#D9D9D9',
}));

export const CreateDialogTitle = styled(DialogTitle)(() => ({
  background: '#121212',
  margin: '10px',
  marginBottom: '5px',
  color: '#D9D9D9',
  fontSize: '30px',
  fontWeight: 'bold',
}));

const ITEM_HEIGHT = 50;

export const MenuProps = {
  PaperProps: {
    sx: {
      color: '#D9D9D9',
      maxHeight: ITEM_HEIGHT * 10,
      width: 250,
      '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
        border: 'none',
      },

      '&::-webkit-scrollbar-thumb': {
        background: '#ffffff',
        border: 'none',
        borderRadius: '5px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-corner': {
        background: 'transparent',
      },
      background: '#222222',
    },
  },
  MenuListProps: {
    sx: {
      padding: '0px',
      margin: '0px',
      '& .MuiMenuItem-root': {
        color: '#D9D9D9',
      },
    },
  },
};

export const CreateDialogFormControl = styled(FormControl)(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: '#D9D9D9',
    background: '#000000',
  },
}));

export const CreateDialogContent = styled(DialogContent)(() => ({
  '& .MuiMenuItem-root': {
    color: '#D9D9D9',
  },
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
    border: 'none',
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#ffffff',
    border: 'none',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-corner': {
    background: 'transparent',
  },
  margin: '10px',
  marginTop: '5px',
  background: '#121212',
  padding: '0px',
}));

export const CreateDialogCheckbox = styled(Checkbox)(() => ({
  color: 'white',
  '&.Mui-checked': {
    color: '#0072CE',
  },
}));

export const CreateDialogMenuItem = styled(MenuItem)(() => ({
  padding: '0px',
  margin: '5px',
  background: '#444444',
  color: '#D9D9D9',
  '&:hover': {
    background: '#666666',
  },
  '&.Mui-selected': {
    background: '#000000',
  },
  '&.Mui-selected:hover': {
    background: '#222222',
  },
}));

export const StyledForm = styled('form')({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  gap: '8px',
});
