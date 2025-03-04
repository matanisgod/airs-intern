import { GridColDef } from '@mui/x-data-grid';

export const caseSetColumns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
];
export const caseColumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
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
