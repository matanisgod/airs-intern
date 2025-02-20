import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const DataTable = styled(DataGrid)(() => ({
  width: '100%',
  color: 'white',
  backgroundColor: 'black',
  display: 'flex',
  marginBottom: 'auto',
  border: '1px solid white',
  fontSize: '14px !important',
  maxHeight: '100%',
  '& .MuiDataGrid-cell': {
    border: '1px solid gray',
    padding: '0px',
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: 'black',
    border: '1px solid gray',
    fontSize: '20px',
    padding: '0px',
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none !important',
  },
  '& .MuiDataGrid-columnHeaderTitleContainerContent': {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}));
