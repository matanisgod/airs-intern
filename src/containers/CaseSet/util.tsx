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
export const customTheme = {
  base00: '#1e1e1e !important',
  base01: '#282c34',
  base02: '#3c4049',
  base03: '#60656f',
  base04: '#abb2bf',
  base05: '#ffffff',
  base06: '#e06c75',
  base07: '#98c379',
  base08: '#56b6c2',
  base09: '#d19a66',
  base0A: '#c678dd',
  base0B: '#61afef',
  base0C: '#e5c07b',
  base0D: '#56b6c2',
  base0E: '#be5046',
  base0F: '#c8ccd4',
};
