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
  color: '#ffffff',
  fontSize: '30px',
}));

export const TableDataBox = styled(Box)(() => ({
  width: '100%',
  height: '90%',
  display: 'flex',
  whiteSpace: 'pre-wrap',
  fontSize: '14px !important',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
    border: 'none',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#ffffff',
    border: 'none',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-corner': {
    background: 'transparent',
  },
  backgroundColor: '#222222',
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
  border: '1px solid black',
  color: '#ffffff',
}));

export const ButtonBox = styled(Box)({
  display: 'flex',
  marginLeft: 'auto',
  marginRight: '10px',
  gap: '20px',
});

export const ModalBox = styled(Box)({
  position: 'absolute',
  backgroundColor: '#222222',
  border: '1px solid white !important',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '30px',
});
