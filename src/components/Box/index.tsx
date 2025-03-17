import { styled, Box } from '@mui/material';

export const PageBox = styled(Box)(() => ({
  width: '100%',
  minWidth: '1920px',
  height: 'calc(100% - 108px)',
  minHeight: '972px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  fontSize: '30px',
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
  //중괄호, 대괄호 안 보이게
  '.react-json-view span[style*="bold"]': {
    display: 'none !important',
  },
  '.react-json-view span': {
    fontFamily: 'NotoSans',
  },
  '.react-json-view div': {
    fontFamily: 'NotoSans',
  },
}));

export const JSONDataBoxTop = styled(Box)(() => ({
  width: '95%',
  height: '48%',
  display: 'flex',
  alignSelf: 'flex-end',
  flexDirection: 'column',
}));

export const JSONDataBoxBot = styled(Box)(() => ({
  width: '95%',
  height: '48%',
  display: 'flex',
  alignSelf: 'flex-end',
  marginTop: 'auto',
  flexDirection: 'column',
}));
export const TableHeaderBox = styled(Box)(() => ({
  width: '100%',
  height: '10%',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '10px',
  backgroundColor: '#232A3E',
}));

export const TableDataBox = styled(Box)(() => ({
  width: '100%',
  height: '90%',
  display: 'flex',
  whiteSpace: 'pre-wrap',
  fontSize: '14px !important',
  overflow: 'auto',
  backgroundColor: '#222222',
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

export const DatagridDefaultBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  fontSize: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#222222',
}));

export const JSONDefaultBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  fontSize: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
