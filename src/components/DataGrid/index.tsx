import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

//TODO: change all
export const DataTable = styled(DataGrid)(() => ({
  border: '1px solid #3B3B3B!important',
  fontSize: '14px !important',
  backgroundColor: '#000',
  '& .MuiDataGrid-cell': {
    '&:focus': {
      outline: 'none !important',
      outlineWidth: '0',
      outlineOffset: '0',
    },
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#121212',
    fontWeight: 700,
    '&:focus': {
      outline: 'none !important',
      outlineWidth: '0',
      outlineOffset: '0',
    },
    '& > .MuiDataGrid-columnSeparator': {
      '& > svg': {
        fill: '#3B3B3B',
      },
    },
  },
  '& .MuiDataGrid-main': {
    '& .MuiDataGrid-columnHeaders': {
      borderBottom: '1px solid #3b3b3b',
      '& .MuiDataGrid-columnHeadersInner': {
        '& .MuiDataGrid-columnHeader:last-child': {
          '& > .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&.MuiDataGrid-withBorderColor': {
            borderRight: 'none',
          },
        },
        '& .MuiDataGrid-withBorderColor': {
          borderRight: '1px solid #3B3B3B',
        },
        '& .MuiDataGrid-columnHeader': {
          '& .MuiDataGrid-columnHeaderDraggableContainer': {
            '& .MuiDataGrid-columnHeaderTitleContainer': {
              justifyContent: 'space-between',
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 700,
                color: '#d9d9d9',
              },
            },
          },
        },
        '& .checkbox-column': {
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            justifyContent: 'center !important',
          },
        },
      },
    },
    '& .MuiDataGrid-virtualScroller': {
      '&::-webkit-scrollbar': {
        width: 8,
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar:horizontal': {
        height: 8,
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-thumb:vertical': {
        backgroundColor: '#4f4f4f',
        backgroundClip: 'padding-box',
        border: 'none',
        borderRadius: 0,
        borderTop: '3px solid transparent',
        borderBottom: '3px solid transparent',
      },
      '&::-webkit-scrollbar-thumb:horizontal': {
        backgroundColor: '#4f4f4f',
        backgroundClip: 'padding-box',
        border: 'none',
        borderRadius: 0,
        borderLeft: '3px solid transparent',
        borderRight: '3px solid transparent',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '&::-webkit-scrollbar-corner': {
        backgroundColor: 'transparent',
      },
      '& .MuiDataGrid-virtualScrollerContent': {
        '&  .MuiDataGrid-virtualScrollerRenderZone': {
          '& .MuiDataGrid-row': {
            '&:hover': {
              background: '#121212',
            },
            '&:hover > .Mui-selected': {
              backgroundColor: '#0E2131 !important',
            },
            '& .MuiDataGrid-withBorder': {
              borderBottom: '1px solid #3b3b3b',
              borderRight: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #3b3b3b',
              borderRight: 'none',
              whiteSpace: 'nowrap',
              color: '#d9d9d9',
              fontWeight: 700,
            },
          },
          '& .MuiDataGrid-row.Mui-selected > .MuiDataGrid-cell': {
            backgroundColor: '#0E2131',
          },
        },
      },
    },
  },
}));
