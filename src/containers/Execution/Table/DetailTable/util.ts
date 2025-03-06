import { GridColDef } from '@mui/x-data-grid';

export const detailColumns: GridColDef[] = [
  {
    field: 'result',
    headerName: 'Result',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'resultLog',
    headerName: 'Result log',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];
