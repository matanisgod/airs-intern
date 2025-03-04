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
            background: 'red',
          },
        },
        '& .MuiDataGrid-row.Mui-selected > .MuiDataGrid-cell': {
          backgroundColor: 'purple',
        },
      },
    },
  },
}));

export const ReadOnlyDataTable = styled(DataGrid)(() => ({
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

export const customTheme = {
  base00: '#1e1e1e !important',
  base01: '#282c34',
  base02: '#3c4049',
  base03: '#60656f',
  base04: '#abb2bf',
  base05: '#98c379',
  base06: '#e06c75',
  base07: '#ffffff',
  base08: '#56b6c2',
  base09: '#d19a66',
  base0A: '#c678dd',
  base0B: '#61afef',
  base0C: '#e5c07b',
  base0D: '#56b6c2',
  base0E: '#be5046',
  base0F: '#c8ccd4',
};
