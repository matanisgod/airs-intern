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
  border: '1px solid white',
}));

export const JSONDataBoxBot = styled(Box)(() => ({
  width: '95%',
  height: '48%',
  display: 'flex',
  alignSelf: 'flex-end',
  marginTop: 'auto',
  flexDirection: 'column',
  border: '1px solid white',
}));
export const TableHeaderBox = styled(Box)(() => ({
  width: '100%',
  height: '10%',
  display: 'flex',
  border: '1px solid white',
  alignItems: 'center',
  paddingLeft: '10px',
}));

export const TableDataBox = styled(Box)(() => ({
  width: '100%',
  height: '90%',
  display: 'flex',
  whiteSpace: 'pre-wrap',
  fontSize: '14px !important',
  overflow: 'auto',
  '& .statusColor.running': {
    backgroundColor: '#4A90E2 !important',
  },
  '& .statusColor.cancelled': {
    backgroundColor: '#D0021B !important',
  },
  '& .statusColor.error': {
    backgroundColor: '#F5A623 !important',
  },
  '& .statusColor.done': {
    backgroundColor: '#7ED321 !important',
  },
}));

export const ModalHeaderBox = styled(Box)(() => ({
  width: '100%',
  height: '30%',
  display: 'flex',
  fontSize: '60px',
  justifyContent: 'center',
  padding: '10px',
  borderBottom: '3px solid red !important',
  alignItems: 'center',
}));

export const ModalDataBox = styled(Box)(() => ({
  width: '100%',
  height: '70%',
  display: 'flex',
  whiteSpace: 'pre-wrap',
  fontSize: '40px',
  padding: '10px',
  alignItems: 'center',
}));
