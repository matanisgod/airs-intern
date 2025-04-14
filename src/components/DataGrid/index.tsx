import { styled } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';

export const DataTable = styled(DataGridPro)(() => ({
  border: '1px solid #121212',
  width: '100%',
  color: '#D9D9D9',
  background: '#1B1B1B',
  display: 'flex',
  fontSize: '14px !important',
  maxHeight: '100%',
  '& .MuiDataGrid-withBorderColor': {
    border: 'none',
  },

  '& .MuiDataGrid-sortIcon': {
    color: '#D9D9D9',
  },
  '& .MuiDataGrid-columnHeaders': {
    background: '#3b3b3b',
    border: 'none',
    color: '#ffffff',
  },

  '& .MuiDataGrid-cell': {
    padding: '0px',
    border: '1px solid #121212',
  },

  '& .MuiDataGrid-columnHeader': {
    fontSize: '14px',
    padding: '0px',
    border: '1px solid #121212',
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

    '& .MuiDataGrid-virtualScrollerContent': {
      '&  .MuiDataGrid-virtualScrollerRenderZone': {
        '& .MuiDataGrid-row': {
          '&:hover': {
            background: '#3c3c3c',
          },
        },
        '& .MuiDataGrid-row.Mui-selected > .MuiDataGrid-cell': {
          background: '#5d5d5d',
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
