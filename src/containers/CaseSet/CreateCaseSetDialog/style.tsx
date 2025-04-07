import { Button, styled } from '@mui/material';

import { DecisionButton } from '@components';

export const SelectButton = styled(Button)(() => ({
  width: '100%',
  height: '100%',
  color: 'white',
  backgroundColor: '#444444',
  textTransform: 'none',
  fontSize: '14px',
  '&:hover': {
    background: '#888888',
  },
}));
export const CaseSetDecisionButton = styled(DecisionButton)(() => ({
  width: '65px',
  height: '40px',
}));
