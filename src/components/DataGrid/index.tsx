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
  '& .MuiDataGrid-cell': {
    border: '1px solid gray',
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: 'black',
    fontWeight: 700,
    border: '1px solid gray',
  },
  '& .MuiDataGrid-checkboxInput': {
    color: 'white',
    '&.Mui-checked': {
      color: 'white',
    },
  },
}));
