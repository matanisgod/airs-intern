import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const DataTable = styled(DataGrid)(() => ({
  border: '1px solid black',
  width: '100%',
  color: 'white',
  backgroundColor: '#222222',
  display: 'flex',
  fontSize: '14px !important',
  maxHeight: '100%',

  '& .MuiDataGrid-cell': {
    padding: '0px',
    border: '1px solid black ',
  },

  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#4B5563',
    fontSize: '20px',
    padding: '0px',
    border: '1px solid black ',
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
            background: '#000000',
          },
        },
        '& .MuiDataGrid-row.Mui-selected > .MuiDataGrid-cell': {
          backgroundColor: 'rgba(0, 143, 186, 0.3)',
        },
      },
    },
  },
  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus': {
    outline: 'none',
  },
  '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus-within': {
    outline: 'none',
  },
}));
