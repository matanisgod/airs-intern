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
  width: '35%',
  height: '95%',
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
  border: '1px solid white',
}));

export const CaseTableBox = styled(Box)(() => ({
  width: '95%',
  height: '48%',
  display: 'flex',
  alignSelf: 'flex-end',
  flexDirection: 'column',
  border: '1px solid white',
}));

export const ExpectedResultTableBox = styled(Box)(() => ({
  width: '95%',
  height: '48%',
  display: 'flex',
  alignSelf: 'flex-end',
  marginTop: 'auto',
  flexDirection: 'column',
  border: '1px solid white',
}));
