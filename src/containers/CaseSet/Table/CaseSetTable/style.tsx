import { styled, Box } from '@mui/material';

import { ConfirmButton, CreateButton } from '@components';

export const CaseSetTableBox = styled(Box)(() => ({
  width: '35%',
  height: '95%',
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
}));
export const CreateCaseSetButton = styled(CreateButton)(() => ({
  width: '200px',
  height: '50px',
  fontSize: '20px',
  marginLeft: 'auto',
}));
export const ActionButton = styled(ConfirmButton)(() => ({
  width: '50px',
  minWidth: '50px',
  height: '50px',
  fontSize: '50px',
  padding: '0px',
  background: '#232A3E',
  '&:hover': {
    background: '#232A3E',
  },
}));
