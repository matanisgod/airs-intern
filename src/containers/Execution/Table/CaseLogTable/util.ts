import { GridColDef } from '@mui/x-data-grid';

import { formatTimeUntilSecond } from '@/utils';

export const caseLogColumns: Array<GridColDef> = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'result',
    headerName: 'Result',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'checkType',
    headerName: 'Check type',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) => formatTimeUntilSecond(params.value).slice(0, 16),
  },
];
