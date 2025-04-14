import { styled, Box } from '@mui/material';

export const PageBox = styled(Box)(() => ({
  width: '100%',
  minWidth: '1600px',
  height: 'calc(100% - 108px)',
  minHeight: '792px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  fontSize: '30px',
  background: '#18181C',
}));

export const SubTablesBox = styled(Box)(() => ({
  width: '30%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  padding: '10px',
  paddingLeft: '0px',
  paddingRight: '0px',
}));

export const JSONDataBox = styled(Box)(() => ({
  width: '30%',
  height: '100%',
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
  width: '100%',
  height: '50%',
  display: 'flex',
  alignSelf: 'flex-end',
  flexDirection: 'column',
  padding: '10px',
  paddingBottom: '5px',
}));

export const JSONDataBoxBot = styled(Box)(() => ({
  width: '100%',
  height: '50%',
  display: 'flex',
  alignSelf: 'flex-end',
  marginTop: 'auto',
  flexDirection: 'column',
  padding: '10px',
  paddingTop: '5px',
}));
export const TableHeaderBox = styled(Box)(() => ({
  width: '100%',
  height: '65px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '20px',
  background: '#121212',
  color: '#D9D9D9',
  fontSize: '30px',
  fontWeight: 'bold',
}));

export const TableDataBox = styled(Box)(() => ({
  width: '100%',
  height: 'calc(100% - 65px)',
  display: 'flex',
  whiteSpace: 'pre-wrap',
  fontSize: '14px !important',
  overflow: 'auto',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingBottom: '10px',
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
  background: '#121212',
}));

export const DatagridDefaultBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  fontSize: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#1B1B1B',
}));

export const JSONDefaultBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  fontSize: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #1B1B1B',
  color: '#ffffff',
}));

export const ButtonBox = styled(Box)({
  display: 'flex',
  marginLeft: 'auto',
  marginRight: '20px',
  gap: '20px',
});

export const ModalBox = styled(Box)({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  minwidth: '480px',
  height: '20%',
  minHeight: '180px',
  fontSize: '30px',
  position: 'absolute',
  background: '#202027',
  color: '#D9D9D9',
});

export const ModalContentBox = styled(Box)({
  width: 'calc(100% - 20px)',
  height: 'calc(100% - 20px)',
  margin: '10px',
  background: '#121212',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '30px',
});
