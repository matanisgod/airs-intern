import { GridColDef } from '@mui/x-data-grid';

export const expectedResultColumns: GridColDef[] = [
  {
    field: 'version',
    headerName: 'Version',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];
