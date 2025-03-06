import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const DataTable = styled(DataGrid)(() => ({
  width: '100%',
  color: 'white',
  backgroundColor: 'black',
  display: 'flex',
  marginBottom: 'auto',
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
  '& .MuiDataGrid-virtualScroller': {
    '& .MuiDataGrid-virtualScrollerContent': {
      '&  .MuiDataGrid-virtualScrollerRenderZone': {
        '& .MuiDataGrid-row': {
          '&:hover': {
            background: '#33373E',
          },
        },
        '& .MuiDataGrid-row.Mui-selected > .MuiDataGrid-cell': {
          backgroundColor: 'rgba(0, 143, 186, 0.3)',
        },
      },
    },
  },
}));
