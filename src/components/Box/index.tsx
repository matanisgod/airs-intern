import { styled, Box } from '@mui/material';

export const TablesBox = styled(Box)(() => ({
  width: '100%',
  height: '90%',
  display: 'flex',
  fontSize: '30px',
  justifyContent: 'center',
  marginTop: 'auto',
}));
export const ExecutionSubTablesBox = styled(Box)(() => ({
  width: '60%',
  height: '95%',
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
}));
export const CaseSetSubTablesBox = styled(Box)(() => ({
  width: '30%',
  height: '95%',
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
}));

export const JSONDataBox = styled(Box)(() => ({
  width: '30%',
  height: '95%',
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
}));

export const JSONDataBoxTop = styled(Box)(() => ({
  width: '95%',
  height: '48%',
  display: 'flex',
  alignSelf: 'flex-end',
  flexDirection: 'column',
  border: '1px solid gray',
  padding: '10px',
  overflow: 'auto',
  fontSize: '14px',
}));

export const JSONDataBoxBot = styled(Box)(() => ({
  width: '95%',
  height: '48%',
  display: 'flex',
  alignSelf: 'flex-end',
  marginTop: 'auto',
  flexDirection: 'column',
  border: '1px solid gray',
  padding: '10px',
  overflow: 'auto',
  fontSize: '14px',
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
