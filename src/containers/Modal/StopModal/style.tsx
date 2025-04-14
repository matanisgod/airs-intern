import { styled, Box } from '@mui/material';

import { DecisionButton } from '@components';

export const ButtonBox = styled(Box)({
  display: 'flex',
  gap: '20px',
});

export const ErrorDecisionButton = styled(DecisionButton)(() => ({
  width: '65px',
  height: '40px',
}));
