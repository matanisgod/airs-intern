import { styled, Box } from '@mui/material';

import { DecisionButton } from '@components';

export const CaseSetTableBox = styled(Box)(() => ({
  width: '40%',
  height: '100%',
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
  padding: '10px',
}));

export const ActionButton = styled(DecisionButton)(() => ({
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
