import { styled, Box, Typography } from '@mui/material';

export const CaseSetBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
}));
export const CaseSetText = styled(Typography)(() => ({
  fontSize: '10rem',
  color: 'blue',
  fontWeight: 'normal',
  marginRight: 30,
  display: 'flex',
}));

export const GetCaseSetBox = styled(Box)(() => ({
  maxHeight: '400px',
  overflow: 'auto',
  border: '1px solid #ccc',
  padding: '8px',
}));

export const GetCaseSetText = styled(Typography)(() => ({
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  color: 'white',
}));

export const TableWrapperBox = styled(Box)(() => ({
  width: '30%',
}));

export const TableViewBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  marginTop: '150px',
  marginLeft: '30px',
}));
