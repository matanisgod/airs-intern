import { GridColDef } from '@mui/x-data-grid';

export const expectedResultColumns: Array<GridColDef> = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'version',
    headerName: 'Version',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];
