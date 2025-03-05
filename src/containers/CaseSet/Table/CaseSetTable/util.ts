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
