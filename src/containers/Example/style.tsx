import { styled, Box } from '@mui/material';

export const ExampleBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    width: '350px',
  },
}));
