import { GridColDef } from '@mui/x-data-grid';
import clsx from 'clsx';

import { formatTimeUntilSecond } from '@utils';

export const caseLogColumns: Array<GridColDef> = [
  {
    field: 'caseName',
    headerName: 'Case name',
    flex: 0.6,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    flex: 0.6,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) => formatTimeUntilSecond(params.value),
  },
  {
    field: 'result',
    headerName: 'Result',
    flex: 0.2,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }
      return clsx('resultColor', {
        true: params.value === 'pass',
        false: params.value === 'fail',
      });
    },
  },
];
