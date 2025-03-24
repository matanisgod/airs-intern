import { GridColDef } from '@mui/x-data-grid';

export const caseColumns: Array<GridColDef> = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];
