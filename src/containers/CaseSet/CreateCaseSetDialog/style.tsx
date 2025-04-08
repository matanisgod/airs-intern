import { Box, Button, ButtonProps, styled, Typography } from '@mui/material';

import { DecisionButton } from '@components';

export const UploadButton = styled(Button)<ButtonProps>(() => ({
  width: '56px',
  height: '56px',
  color: 'white',
  backgroundColor: '#222222',
  textTransform: 'none',
  fontSize: '25px',
  '&:hover': {
    background: '#666666',
  },
  marginLeft: 'auto',
  border: '1px solid white !important',
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
  border: '1px solid white',
}));

export const UploadText = styled(Typography)(() => ({
  marginLeft: '14px',
}));
