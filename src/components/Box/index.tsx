import { styled, Box } from '@mui/material';

export const TablesBox = styled(Box)(() => ({
  width: '100%',
  height: '90%',
  display: 'flex',
  fontSize: '30px',
  justifyContent: 'center',
  marginTop: 'auto',
}));

export const SubTablesBox = styled(Box)(() => ({
  width: '60%',
  height: '95%',
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
}));

export const TableHeaderBox = styled(Box)(() => ({
  width: '100%',
  height: '10%',
  display: 'flex',
}));

export const TableDataBox = styled(Box)(() => ({
  width: '100%',
  height: '90%',
  display: 'flex',
  whiteSpace: 'pre-wrap',
}));
