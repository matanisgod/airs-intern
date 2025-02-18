import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
  },
];
