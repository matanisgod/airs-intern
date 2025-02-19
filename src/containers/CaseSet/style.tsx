import { styled, Box } from '@mui/material';

export const CaseSetBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  '& svg': {
    width: '350px',
  },
}));

export const CaseSetTableBox = styled(Box)(() => ({
  width: '30%',
  height: '95%',
  display: 'flex',
  background: 'red',
  alignSelf: 'center',
  flexDirection: 'column',
}));

export const CaseTableBox = styled(Box)(() => ({
  width: '95%',
  height: '48%',
  display: 'flex',
  background: 'green',
  alignSelf: 'flex-end',
  flexDirection: 'column',
}));

export const ExpectedResultTableBox = styled(Box)(() => ({
  width: '95%',
  height: '48%',
  display: 'flex',
  background: 'blue',
  alignSelf: 'flex-end',
  marginTop: 'auto',
  flexDirection: 'column',
}));
