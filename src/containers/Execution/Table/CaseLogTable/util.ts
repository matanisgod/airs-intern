import { GridColDef } from '@mui/x-data-grid';
import clsx from 'clsx';

import { formatTimeUntilSecond } from '@utils';

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
    valueGetter: (params) => formatTimeUntilSecond(params.value),
  },
  {
    field: 'result',
    headerName: 'Result',
    flex: 0.45,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }
      return clsx('resultColor', {
        true: params.value === 'True',
        false: params.value === 'False',
      });
    },
  },
];
