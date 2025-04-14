import { Box, Button, ButtonProps, styled, Typography } from '@mui/material';

import { DecisionButton } from '@components';

export const UploadButton = styled(Button)<ButtonProps>(() => ({
  width: '56px',
  height: '56px',
  background: '#000000',
  textTransform: 'none',
  fontSize: '25px',
  '&:hover': {
    background: '#222222',
  },
  marginLeft: 'auto',
}));
export const CaseSetDecisionButton = styled(DecisionButton)(() => ({
  width: '65px',
  height: '40px',
}));
export const UploadBox = styled(Box)(() => ({
  width: '100%',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  background: '#000000',
}));

export const UploadText = styled(Typography)(() => ({
  marginLeft: '14px',
  color: '#D9D9D9',
}));
